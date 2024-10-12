import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { urlState } from "@/UserContext";
import { BeatLoader } from "react-spinners";
import { Card } from "./ui/card";
import * as Yup from "yup";
import Error from "./Error";
import { useNavigate, useSearchParams } from "react-router-dom";
const CreateUrl = () => {
  const { user } = urlState();
  const [searchParams] = useSearchParams();
  const longurl = searchParams.get("createNew");
  const navigate = useNavigate();
  const [error, seterror] = useState({});
  const [formValue, setformValue] = useState({
    title: "",
    longUrl: longurl ? longurl : "",
    customUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formValue,
      [name]: value,
    });
  };
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Orignial url is required"),
    customUrl: Yup.string(),
  });
  const handleSubmit = async () => {
    seterror({});
    try {
      await schema.validate(formValue, { abortEarly: false });
    } catch (e) {
      const newerrors = {};
      e.inner.forEach((err) => {
        newerrors[err.path] = err.message;
      });
      seterror(newerrors);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-blue-500 hover:bg-blue-400 text-white">
            Create Short Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2 text-xl">
              {`Hey 👋, ${
                user?.user_metadata?.name.split(" ")[0]
              } ! Welcome to LinkLytics. Let's create your short link.`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Input
              name="title"
              value={formValue.title}
              placeholder="Title for your short link"
              onChange={handleChange}
            />
            {error && <Error message={"Error.message"} />}
            <Input
              name="longUrl"
              value={formValue.longUrl}
              placeholder="Paste your long URL here"
              onChange={handleChange}
            />{" "}
            {error && <Error message={"Error.message"} />}
            <div className="flex items-center gap-2">
              <Card className="p-2">linklytics.in</Card> /
              <Input
                name="customUrl"
                value={formValue.customUrl}
                placeholder="Custom short link (optional)"
                onChange={handleChange}
              />{" "}
            </div>{" "}
            {error && <Error message={"Error.message"} />}
          </div>
          <DialogFooter>
            <Button type="button" className="w-full ">
              Create Short Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateUrl;
