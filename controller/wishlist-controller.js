const uuid = require("uuid/v4");
const HttpError = require("../models/http-errors");
const WishList = require("../models/wishlist-model");

const addToWishList = async (req, res, next) => {
  const { productID, userID } = req.body;

  const WishListItem = new WishList({
    productID,
    userID,
  });

  try {
    console.log(WishListItem);
    await WishListItem.save();
    res.json({ message: "Added Succeefully", added: 1 });
  } catch (err) {
    const error = new HttpError("Adding failed, please try again.", 500);
    res.json({ message: "Adding failed, please try again.", added: 0 });
    return next(error);
  }

  res
    .status(201)
    .json({ wishListItem: WishListItem.toObject({ getters: true }) });
};

const deleteWishList = async (req, res, next) => {
  let userID = req.params.userID;
  let productID = req.params.productID;

  WishList.deleteOne({ userID, productID })
    .then(() => res.json({ message: "Deleted data from DB", delete: 1 }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Deleted failed, please try again.", delete: 0 })
    );
};

exports.addToWishList = addToWishList;
exports.deleteWishList = deleteWishList;
exports.getWishList = getWishList;