import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

// GET all members
router.get("/", async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single member by ID
router.get("/:id", async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Member not found" });
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE new member
router.post("/", async (req, res) => {
    const { name, email, plan, status } = req.body;
    try {
        const newMember = new Member({ name, email, plan, status });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE member
router.put("/:id", async (req, res) => {
    const { name, email, plan, status } = req.body;
    try {
        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id,
            { name, email, plan, status },
            { new: true }
        );
        if (!updatedMember) return res.status(404).json({ message: "Member not found" });
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE member
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Member.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Member not found" });
        res.json({ message: "Member deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;