import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Button from "@mui/material/Button";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image1Preview, setImage1Preview] = useState(assets.upload_area);
  const [image2Preview, setImage2Preview] = useState(assets.upload_area);
  const [image3Preview, setImage3Preview] = useState(assets.upload_area);
  const [image4Preview, setImage4Preview] = useState(assets.upload_area);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const handleImagePreview = (image, setPreview) => {
    if (!image) {
      setPreview(assets.upload_area);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };

  useEffect(() => {
    return handleImagePreview(image1, setImage1Preview);
  }, [image1]);

  useEffect(() => {
    return handleImagePreview(image2, setImage2Preview);
  }, [image2]);

  useEffect(() => {
    return handleImagePreview(image3, setImage3Preview);
  }, [image3]);

  useEffect(() => {
    return handleImagePreview(image4, setImage4Preview);
  }, [image4]);

  const onSubmitHAndler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        },
      );

      if (response.data.success) {
        toast.success("Product added successfully");
        setName("");
        setDescription("");
        setCategory("Men");
        setSubCategory("Topwear");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the product");
    }
  };

  return (
    <form
      action=""
      onSubmit={onSubmitHAndler}
      className=" flex flex-col w-full items-start gap-3"
    >
      <div className="">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1" className="">
            <img
              src={image1Preview}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              className=""
              hidden
            />
          </label>
          <label htmlFor="image2" className="">
            <img
              src={image2Preview}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              className=""
              hidden
            />
          </label>
          <label htmlFor="image3" className="">
            <img
              src={image3Preview}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              className=""
              hidden
            />
          </label>
          <label htmlFor="image4" className="">
            <img
              src={image4Preview}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              className=""
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full max-w-[500px] px-3 py-2 appearance-none 
               border border-gray-300 rounded-xl 
               bg-white text-gray-700 text-sm font-medium
               shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400
               transition-all duration-200 cursor-pointer"
          placeholder="type here "
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="w-full max-w-[500px] px-3 py-2 appearance-none 
               border border-gray-300 rounded-xl 
               bg-white text-gray-700 text-sm font-medium
               shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400
               transition-all duration-200 cursor-pointer"
          placeholder="write product description  here "
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2">Product Category</p>

          <div className="relative w-full sm:w-60 group">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="appearance-none w-full px-4 py-2.5 pr-10 
               border border-gray-300 rounded-xl 
               bg-white text-gray-700 text-sm font-medium
               shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400
               transition-all duration-200 cursor-pointer"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>

            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="">
          <p className="mb-2 ">Sub Category</p>

          <div className="relative w-full sm:w-60 group">
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              value={subCategory}
              className="appearance-none w-full px-4 py-2.5 pr-10 
               border border-gray-300 rounded-xl 
               bg-white text-gray-700 text-sm font-medium
               shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400
               transition-all duration-200 cursor-pointer"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>

            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="">
          <p className=" mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            className="appearance-none w-full sm:w-60 px-4 py-2.5 pr-10 
               border border-gray-300 rounded-xl 
               bg-white text-gray-700 text-sm font-medium
               shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               hover:border-gray-400
               transition-all duration-200 cursor-pointer"
            placeholder="25"
          />
        </div>
      </div>
      <div className="">
        <p className="mt-2 mb-2">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"],
              )
            }
          >
            <p
              className={`${sizes.includes("S") ? "bg-black  text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"],
              )
            }
          >
            <p
              className={`${sizes.includes("M") ? "bg-black  text-white" : "bg-slate-200 text-black"} px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"],
              )
            }
          >
            <p
              className={`${sizes.includes("L") ? "bg-black  text-white" : "bg-slate-200 text-black"} px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"],
              )
            }
          >
            <p
              className={`${sizes.includes("XL") ? "bg-black  text-white" : "bg-slate-200 text-black"} px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"],
              )
            }
          >
            <p
              className={`${sizes.includes("XXL") ? "bg-black  text-white" : "bg-slate-200 text-black"} px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add To bestseller
        </label>
      </div>

      <Button
        className="bg-blue-600 text-white px-5 py-2 rounded-full mt-4"
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          paddingX: "31px",
          paddingY: "11px",
          fontSize: "13px",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Add Product
      </Button>
    </form>
  );
};

export default Add;
