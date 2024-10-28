import { StatusCodes } from 'http-status-codes';
import {
  addBook,
  deleteBook as deleteBookModel,
  getBook as getBookModel,
  getBooks as getBooksModel,
  updateBook as updateBookModel,
} from '../models/BookModel.js';

export const createBook = async (req, res) => {
  try {
    const book = await addBook(req.body);
    return res.status(201).json(book);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const queryParams = req.query;
    const books = await getBooksModel(queryParams);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookModel(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await updateBookModel(id, req.body);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBookModel(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};
