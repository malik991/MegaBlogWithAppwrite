import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, InPut, ReactTextEditor, SelectComponent } from "../index";
import dbServiceObj from "../../appwrite/configAppwrite";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPost, editPost } from "../../store/postThunkSlice";

function PostForms({ postDataValue }) {
  //console.log("enter in postForm.jsx", postDataValue);
  // here we use another capability of useForm 'Watch' we can continusly watch any filed
  // setValue another thing . in react form we set the values like this
  // and controll which we pass in RTE, which provide me the controll of its all value or incase editor contol here
  // last getValues of that form, now we will pass an object in useForm
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        //use the same form for new create post and edit the post value
        title: postDataValue?.title || "", // it mean if postData has value than use it
        slug: postDataValue?.slug || "",
        content: postDataValue?.content || "",
        status: postDataValue?.status || "active",
      },
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authName.userData);
  const status = useSelector((state) => state.postThunk.status);
  const error = useSelector((state) => state.postThunk.error);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    // here we receive data from hookForm thats why we use that data and extract it
    if (postDataValue) {
      dispatch(editPost({ data, postDataValue, userId: userData.$id }));
      if (status === "succeeded" && error === null) {
        setLoading(true);
      }
    } else {
      // addpost is a asyncthunk function which take  only one obj as a parameter
      //console.log("1");
      dispatch(addPost({ data: data, userId: userData.$id }));
    }
    //console.log("2");
    //console.log("Status: ", status);

    // Wait for the promise to resolve before navigating
    await new Promise((resolve) => setTimeout(resolve, 2500));
    // Reset loading to false after the promise is resolved
    //setLoading(false);
    //console.log("Status after wait 2500: ", status);
    if (status === "succeeded" && error === null) {
      setLoading(true);
    }
  };

  // const submit = useCallback(
  //   async (data) => {
  //     if (postDataValue) {
  //       dispatch(editPost({ data, postDataValue, userId: userData.$id }));
  //     } else {
  //       dispatch(addPost({ data, userId: userData.$id }));
  //     }

  //     //setLoading(true);

  //     try {
  //       // Wait for the promise to resolve
  //       await new Promise((resolve) => setTimeout(resolve, 2500));

  //       //setLoading(false);
  //       console.log("Status in submit function:", status);
  //     } catch (error) {
  //       //setLoading(false);
  //       console.error("An unexpected error occurred:", error);
  //     }
  //   },
  //   [postDataValue, dispatch, status, error, navigate, userData.$id]
  // );

  // slug transform method
  // here we watch the title and and generate the slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      //console.log("slugTransform: ", value);
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    // when we store the result of a call back method , so for optimization we will unsubscribe it
    // like this
    // here name will come from form
    console.log("rending again: ", status);
    if (status === "loading") {
      console.log("state is loading: ", status);
    } else if (status === "succeeded" && error === null && loading) {
      // Move the navigation logic here
      console.log("Navigating to /all-posts");

      navigate("/all-posts");
    } else if (status === "failed") {
      console.error("Submission failed:", error);
    }
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        // if name is title than set the value where ? in the slug field where
        // input filed name is slug, here value is an objc
        //const getslug = slugTransform(value.title);
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    if (postDataValue) {
      setValue("slug", postDataValue.title);
    }
    //console.log("enter in subscription: ", getValues("content"));
    // so for optimation of above method when use in useEffect we retunr it like this
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue, status]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 px-2">
        <InPut
          label="Title"
          type="text"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <InPut
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <ReactTextEditor
          label="Your Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <InPut
          label="Blog Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !postDataValue })}
        />
        {postDataValue && (
          <div className="w-full mb-4">
            <img
              src={dbServiceObj.filePreview(postDataValue.featuredImage)}
              alt={postDataValue.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SelectComponent
          choices={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={postDataValue ? "bg-green-400" : undefined}
          //className="w-full"
          className={`w-full ${status === "loading" ? "opacity-50" : ""}`}
          disabled={status === "loading"} // when laoding disabl button
        >
          {status === "loading"
            ? "Submitting..."
            : postDataValue
            ? "Update"
            : "Submit"}
          {/* {postDataValue ? "Update" : "Submit"} */}
        </Button>
        {/* Display a loading indicator */}
        {status === "loading" && <p>Loading...</p>}
        {/* Display an error message if status is "failed" */}
        {status === "failed" && (
          <div className="text-red-500 mt-2">
            {error || "Something went wrong."}
          </div>
        )}
      </div>
    </form>
  );
}

export default PostForms;
