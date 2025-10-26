const data = require("./initialData.json");

const { findOne: findUserById } = require("@features/users/models/usersDataAccessService");
const { create: createPost } = require("@features/posts/models/postsDataAccessService");
const { create: createProject } = require("@features/projects/models/projectsDataAccessService");
const { create: createTask } = require("@features/tasks/models/tasksDataAccessService");
const { ConfigurationError, AlreadyExistsError, NotFoundError } = require("@/utils/customErrors");
const { generateUserPassword } = require("@/features/users/helpers/bcrypt");
const Log = require("@logger/loggers/customLogger");
const chalk = require("chalk");

const User = require("@features/users/models/mongodb/User");
const Project = require("@features/projects/models/mongodb/Project");
const Task = require("@features/tasks/models/mongodb/Task");
const Post = require("@features/posts/models/mongodb/Post");

const usersMap = {};
const projectsMap = {};

const generateInitialUsers = async (debug) => {
    const users = data.users;
    if (!process.env.ADMIN) {
        throw new ConfigurationError("ADMIN environment variable is required.");
    }

    for (let user of users) {
        // Creating the user.
        // If the user already exists, it will be skipped.
        // Each user creation/registration will be handled individually.

        try {
            const { email } = user;
            const isUserExists = await User.findOne({ email });

            if (isUserExists) {
                throw new AlreadyExistsError("User is already registered with that email");
            }

            const nicknameTaken = await User.findOne({ nickname: user.nickname });
            if (nicknameTaken) {
                throw new AlreadyExistsError("Nickname is already taken");
            }

            // Encrypting the user's password.
            if (user.isAdmin) {
                user.password = generateUserPassword(process.env.ADMIN);
            } else {
                user.password = generateUserPassword(user.password);
            }

            user = await User(user);
            user = await user.save();
            usersMap[user.nickname] = user;
        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                const existedUser = await User.findOne({ email: user.email });
                usersMap[existedUser.nickname] = existedUser;

                if (debug) Log.info(chalk.yellowBright(error.message), { override: true });
            } else {
                throw error;
            }
        }
    }
};

// Example corrected version for posts with likes
const generateInitialPosts = async (debug) => {
    const posts = data.posts;

    for (const post of posts) {
        try {
            if (await Post.findOne({ createdBy: usersMap[post.createdBy]._id })) {
                throw new AlreadyExistsError(
                    `Initial data post '${post.content.slice(0, 20) + "..."}' created by '${
                        post.createdBy
                    }' already exists`
                );
            }

            const nickname = post.createdBy;

            if (!usersMap[nickname]) {
                throw new NotFoundError(
                    `Could not find the post's creator user with the nickname '${nickname}'`
                );
            }

            post.createdBy = usersMap[nickname]._id;
            post.likes = post.likes.map((nickname) => usersMap[nickname]._id);

            let createdPost = await Post(post);
            createdPost = await createdPost.save();

            // Updating the user's posts array.
            const creator = await User.findById(usersMap[nickname]._id);
            creator.posts.push(createdPost._id);
            await creator.save();
        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                if (debug) Log.info(chalk.yellowBright(error.message), { override: true });
            } else {
                throw error;
            }
        }
    }
};

const generateInitialProjects = async (debug) => {
    const projects = data.projects;

    for (const project of projects) {
        try {
            const creator = project.createdBy;
            if (await Project.findOne({ name: project.name, createdBy: usersMap[creator]._id })) {
                throw new AlreadyExistsError(
                    `Initial data project '${project.name}' created by '${creator}' already exists`
                );
            }
            project.createdBy = usersMap[creator]._id;
            let createdProject = await Project(project);
            createdProject = await createdProject.save();
            projectsMap[project.name] = createdProject;
        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                const createdProject = await Project.findOne({
                    name: project.name,
                    createdBy: usersMap[project.createdBy]._id,
                });
                projectsMap[createdProject.name] = createdProject;
                if (debug) Log.info(chalk.yellowBright(error.message), { override: true });
            } else {
                throw error;
            }
        }
    }
};

const generateInitialTasks = async (debug) => {
    const tasks = data.tasks;

    for (const task of tasks) {
        // The initial task's projectId value was the name of the project.
        // Replacing with the project's _id value.
        try {
            if (
                await Task.findOne({ title: task.title, createdBy: usersMap[task.createdBy]._id })
            ) {
                throw new AlreadyExistsError(`Initial data task '${task.title}' already exists`);
            }

            const project = projectsMap[task.projectId];
            task.projectId = project._id;
            task.createdBy = usersMap[task.createdBy]._id;

            let createdTask = await Task(task);
            createdTask = await createdTask.save();

            project.tasks.push(createdTask._id);
            await project.save();
        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                if (debug) Log.info(chalk.yellowBright(error.message), { override: true });
            } else {
                throw error;
            }
        }
    }
};

const generateInitialData = async (debug = true) => {
    try {
        await generateInitialUsers(debug);
        await generateInitialProjects(debug);
        await generateInitialTasks(debug);
        await generateInitialPosts(debug);

        Log.info("✅ Initial data generation completed successfully.", new Error());
    } catch (error) {
        Log.error(`❌ Error during initial data generation:\n${error.message}`, error);
    }
};

module.exports = generateInitialData;
