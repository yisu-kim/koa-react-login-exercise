import Book from "models/Book";

export const create = async (ctx) => {
  const { title, authors, publishedDate, price, tags } = ctx.request.body;

  const book = new Book({
    title,
    authors,
    publishedDate,
    price,
    tags,
  });

  try {
    await book.save();
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = book;
};

export const list = async (ctx) => {
  let books;

  try {
    books = await Book.find().sort({ _id: -1 }).limit(3);
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = books;
};

export const get = async (ctx) => {
  const { id } = ctx.params;

  let book;

  console.log("get method");
  try {
    book = await Book.findById(id);
  } catch (e) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e);
  }

  if (!book) {
    ctx.status = 400;
    ctx.body = { message: "book not found" };
    return;
  }

  ctx.body = book;
};

export const del = (ctx) => {
  ctx.body = "deleted";
};

export const replace = (ctx) => {
  ctx.body = "replaced";
};

export const update = (ctx) => {
  ctx.body = "updated";
};
