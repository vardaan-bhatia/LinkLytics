import { storeClicks } from "@/db/apiClicks";
import { getlongUrl } from "@/db/apiUrls";
import useFetch from "@/Hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn: fnlongurl } = useFetch(getlongUrl, id);
  const { loading: loadingclick, fn: fnclick } = useFetch(storeClicks, {
    id: data?.id,
    original_url: data?.original_url,
  });
  // Fetch the long url
  useEffect(() => {
    fnlongurl();
  }, []);
  useEffect(() => {
    if (!loading && data) {
      fnclick();
    }
  }, [loading]);
  if (loading || loadingclick) {
    return (
      <>
        <div
          className="w-full mt-4  "
          style={{
            background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
          }}
        >
          <BarLoader width={"100%"} color="#ffffff" />
        </div>
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
