const normalizeUser = (rawUser) => {
    if (!rawUser) return null;

    const { url, alt } = rawUser.profileImage;
    const profileImage = {
        url:
            url ||
            "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
        alt: alt || "User profile image",
    };

    const name = {
        ...rawUser.name,
        middle: rawUser.name.middle || "",
    };

    const user = {
        ...rawUser,
        name,
        profileImage,
    };

    console.log("RawUser", rawUser);
    console.log("NormalizedUser", user);
    return user;
};

module.exports = normalizeUser;
