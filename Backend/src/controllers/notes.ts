import { RequestHandler } from "express";
import NoteModel from "../models/notes";

export const getNotes:RequestHandler = async (req, res,next) => {
    try {
        const notes = await NoteModel.find().exec();
        console.log(notes);
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

export const getNote:RequestHandler = async (req, res,next) => {
    const noteid = req.params.noteid;

    try {
        const note = await NoteModel.findById(noteid).exec();
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}



export const createNotes:RequestHandler = async (req, res,next) => {

    const title = req.body.title;
    const text = req.body.text;

    try {
        const note = await NoteModel.create(
            {
                title:title,
                text:text
            }
        );
        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
}