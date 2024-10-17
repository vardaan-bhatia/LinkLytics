import { storeClicks } from "@/db/apiClicks";
import { getlongUrl } from "@/db/apiUrls";
import useFetch from "@/Hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingBar from "@/components/LoadingBar";

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
        <LoadingBar />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
