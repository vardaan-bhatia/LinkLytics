import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import useFetch from "@/Hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import { urlState } from "@/UserContext";
import Error from "@/components/Error";
import UrlCard from "@/components/UrlCard";
import createUrl from "../components/CreateUrl";
import CreateUrl from "../components/CreateUrl";

const Dashboard = () => {
  const [searchKey, setSearchKey] = useState("");
  const { user } = urlState();

  const {
    data: urlData,
    error: urlError,
    loading: urlLoading,
    fn: fetchUrls,
  } = useFetch(getUrls, user?.id);

  const {
    data: clickData,
    loading: clickLoading,
    fn: fetchClicks,
  } = useFetch(
    getClicks,
    urlData?.map((url) => url.id)
  );

  useEffect(() => {
    fetchUrls();
  }, []);

  useEffect(() => {
    if (urlData?.length) fetchClicks();
  }, [urlData?.length]);

  const filteredUrls = urlData?.filter((url) =>
    url?.title?.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      {urlLoading && clickLoading && (
        <div className="flex justify-center mt-4">
          <BarLoader width={"100%"} color="#ffffff" />
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4  ">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{urlData?.length ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{clickData?.length ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Links Section */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-bold">My Links</h1>
        <CreateUrl />
      </div>

      {/* Search Filter */}
      <div className="relative mt-4">
        <Input
          type="text"
          placeholder="Filter Links by Title..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="pr-10"
        />
        <Filter className="absolute top-2 right-6 text-gray-500" />
      </div>

      {/* Error Display */}
      {urlError && <Error message={urlError?.message} />}

      {/* URL Cards */}
      <div>
        {filteredUrls?.length ? (
          filteredUrls.map((url, index) => (
            <UrlCard key={index} url={url} fetchurl={fetchUrls} />
          ))
        ) : (
          <p className="text-gray-500">No URLs found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
