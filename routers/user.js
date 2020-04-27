const express = require("express");
const UserController = require("../controllers/user");
const multiParty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multiParty({ uploadDir: "./uploads/avatar" });

const api = express.Router();

// Sign-in, Sign-up
api.post("/sign-in", UserController.signIn);
api.post("/sign-up", UserController.signUp);

// User
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put("/activate-user/:id", [md_auth.ensureAuth], UserController.activateUser);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);

// Avatar
api.put("/upload-avatar/:id", [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", UserController.getAvatar);

module.exports = api;