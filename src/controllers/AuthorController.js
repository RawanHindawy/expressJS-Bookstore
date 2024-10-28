import { StatusCodes } from 'http-status-codes';
import {
  addAuthor,
  deleteAuthor as deleteAuthorModel,
  getAuthor as getAuthorModel,
  getAuthors as getAuthorsModel,
  updateAuthor as updateAuthorModel,
} from '../models/AuthorModel.js';

export const createAuthor = async (req, res) => {
  try {
    const author = await addAuthor(req.body);
    return res.status(201).json(author);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getAuthors = async (_, res) => {
  try {
    const authors = await getAuthorsModel();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await getAuthorModel(id);
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await updateAuthorModel(id, req.body);
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAuthorModel(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};
