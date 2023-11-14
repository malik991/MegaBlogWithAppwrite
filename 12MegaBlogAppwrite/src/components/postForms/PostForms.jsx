import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InPut, ReactTextEditor, SelectComponent } from "../index";
import dbServiceObj from "../../appwrite/configAppwrite";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const naviage = useNavigate();
  const userData = useSelector((state) => state.authName.userData);

  const submit = async (data) => {
    // here we receive data from hookForm thats why we use that data and extract it
    if (postDataValue) {
      const file = data.image[0]
        ? await dbServiceObj.uploadFile(data.image[0])
        : null;
      if (file) {
        await dbServiceObj.deleteFile(postDataValue.featuredImage);
      }
      const updateDbPost = await dbServiceObj.updatePost(
        // postDataValue.$id is the unique value of that post

        postDataValue.$id,
        {
          ...data, // remaming all data will be spread here like title , content etc
          featuredImage: file ? file.$id : undefined, // but featured Image will be overwrite coz we update it above
        }
      );
      if (updateDbPost) {
        naviage(`/post/${updateDbPost.$id}`); // updateDbPost will provide use the
      }
    } else {
      // first of all upload the file
      const file = data.image[0]
        ? await dbServiceObj.uploadFile(data.image[0])
        : null;

      //console.log("userData: ", userData.name);
      const createPost = await dbServiceObj.createPost({
        ...data,
        featuredImage: file ? file.$id : undefined,
        userId: userData.$id,
      });
      if (createPost) {
        naviage(`/post/${createPost.$id}`);
      }
    }
  };

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
  }, [watch, slugTransform, setValue]);

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
          className="w-full"
        >
          {postDataValue ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForms;
