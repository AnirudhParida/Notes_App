import { RequestHandler } from "express";
import NoteModel from "../models/notes";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getNotes:RequestHandler = async (req, res,next) => {
    try {
        const notes = await NoteModel.find().exec();
        console.log(notes);
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

interface CreateNoteBody{
    title?:string,
    text?:string
}

export const getNote:RequestHandler = async (req, res,next) => {
    const noteid = req.params.noteid;

    try {

        if(!mongoose.isValidObjectId(noteid)){
            throw createHttpError(400,'Invalid note id'); 
        }

        const note = await NoteModel.findById(noteid).exec();

        if(!note){
            throw createHttpError(404,'Note not found');
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}



export const createNotes:RequestHandler<unknown,unknown,CreateNoteBody,unknown> = async (req, res,next) => {

    const title = req.body.title;
    const text = req.body.text;

    try {

        if(!title){
            throw createHttpError(400,'Please provide title');
        }

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