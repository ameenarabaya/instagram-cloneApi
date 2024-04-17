import { Router } from "express";
import * as userController from './user.controller.js';
import upload from "../../utility/middleware/uploadPhoto.js";

const router = Router();
router.get('/',userController.getAllUser);
router.post('/signup',userController.register);
router.post('/login',userController.login);
router.patch('/update',upload.single("avatar"),userController.updateUser);
router.delete('/delete',userController.deleteUser);
router.get('/searchUser/:userName',userController.getUserByName);
export default router;