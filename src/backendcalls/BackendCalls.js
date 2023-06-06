const BASE_URL = "https://blog-mern-app-0ihp.onrender.com";
// READ
export const ReadCall = async ({ url }) => {
  console.log(`${BASE_URL}/${url}`);
  try {
    const blogs = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await blogs.json();
    console.log(res);
    return res.Blogs;
  } catch (error) {
    console.log(error.message);
  }
};
// CREATE
export const CreateCall = async ({ url, data }) => {
  try {
    const blog = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return blog;
  } catch (error) {
    console.log(error.message);
  }
};

// UPDATE
export const UpdateCall = async ({ url, data }) => {
  try {
    const blog = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: data.image,
        title: data.title,
        description: data.description,
      }),
    });
    return blog;
  } catch (error) {
    console.log(error.message);
  }
};
// DELETE
export const DeleteCall = async ({ url }) => {
  try {
    const blog = await fetch(`${BASE_URL}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return blog;
  } catch (error) {
    console.log(error.message);
  }
};
