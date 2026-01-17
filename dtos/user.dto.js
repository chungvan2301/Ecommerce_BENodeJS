class CreateUserDTO {
    constructor({ firstname, lastname, email, mobile, password }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
    }
}

class UserResponseDTO {
    constructor(user) {
        this.id = user._id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.mobile = user.mobile;
        this.role = user.role;
        this.createdAt = user.createdAt;
    }
}

module.exports = {
    CreateUserDTO,
    UserResponseDTO
};
