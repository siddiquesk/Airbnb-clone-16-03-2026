const Listing =require("../model/Listing");



module.exports.searchBar= async (req, res, next) => {
  try {
    const { q } = req.query;
    let listings;

    if (q) {
      listings = await Listing.find({
        title: { $regex: q, $options: "i" },
      });
    } else {
      listings = await Listing.find({});
    }

    res.render("listings/search.ejs", { listings, q });
  } catch (err) {
    next(err);
  }
};

module.exports.contacts= async (req, res, next) => {
  try {
     res.render("listings/contact.ejs");
  } catch (err) {
    next(err);
  }
};

