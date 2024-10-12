import { request } from "express";
import { borrowLoan, depositSaving, getSavings } from "../modules/updatesavings.js";
import router from "./base/base.js";

/* 
this is the routes for the api */
router.post('/',(req,res)=>res.status(403).send("I think you are lost.You are not suppose to be here."));
router.post("/get-general-stats",async (req,res) => res.send(await getSavings()));
router.post("/deposit",async (req,res) => res.send(await depositSaving(req)));
router.post("/borrow-loan",async (req,res) => res.send(await borrowLoan(req)));
export default router;