import express from "express";
import auth from "../middlewares/auth.middleware.js"; // آپ کا فراہم کردہ مڈل ویئر
import { 
    withdrawRequest, 
    withdrawProcess, 
    withdrawList,
    getWithdrawHistory // ایک اضافی ضروری فنکشن
} from "../controllers/wallet.controller.js";

const router = express.Router();

/**
 * @ROUTE: /api/wallet/withdraw
 * @DESC: یوزر یا ڈرائیور اپنی رقم نکالنے کی درخواست بھیجتا ہے
 * @ACCESS: Protected (User/Driver)
 */
router.post("/withdraw", auth, withdrawRequest);

/**
 * @ROUTE: /api/wallet/withdraw/history
 * @DESC: یوزر اپنی پرانی ٹرانزیکشنز کی لسٹ دیکھتا ہے
 * @ACCESS: Protected (User/Driver)
 */
router.get("/withdraw/history", auth, getWithdrawHistory);

/**
 * @ROUTE: /api/wallet/withdraw/process
 * @DESC: ایڈمن کسی درخواست کو اپروو یا ریجیکٹ کرتا ہے
 * @ACCESS: Protected (Admin Only)
 * گلو کوڈ نوٹ: یہاں آپ کو رول چیک کرنا چاہیے (req.user.role === 'admin')
 */
router.post("/withdraw/process", auth, withdrawProcess);

/**
 * @ROUTE: /api/wallet/withdraw/list
 * @DESC: ایڈمن تمام یوزرز کی پینڈنگ اور مکمل درخواستیں دیکھتا ہے
 * @ACCESS: Protected (Admin Only)
 */
router.get("/withdraw/list", auth, withdrawList);

export default router;
