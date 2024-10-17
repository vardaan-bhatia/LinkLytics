import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import useFetch from "@/Hooks/useFetch";
import { getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import { urlState } from "@/UserContext";
import Error from "@/components/Error";
import UrlCard from "@/components/UrlCard";
import CreateUrl from "../components/CreateUrl";
import Pagination from "@/components/Pagination";
import LoadingBar from "@/components/LoadingBar";

// Main Dashboard component
const Dashboard = () => {
  const [searchKey, setSearchKey] = useState(""); // Search input state
  const { user } = urlState(); // Access user state
  const [page, setpage] = useState(1);
  // Fetch URLs based on user ID
  const {
    data: urlData,
    error: urlError,
    loading: urlLoading,
    fn: fetchUrls,
  } = useFetch(getUrls, user?.id);

  // Fetch clicks data for the fetched URLs
  const {
    data: clickData,
    loading: clickLoading,
    fn: fetchClicks,
  } = useFetch(
    getClicks,
    urlData?.map((url) => url.id) // Pass URL IDs for fetching click data
  );
  useEffect(() => {
    fetchUrls(); // Fetch URLs on component mount
  }, []);

  useEffect(() => {
    if (urlData?.length) fetchClicks(); // Fetch clicks once URLs are loaded
  }, [urlData?.length]);

  // Filter URLs based on the search input
  const filteredUrls = urlData?.filter((url) =>
    url?.title?.toLowerCase().includes(searchKey.toLowerCase())
  );

  // Logic to handle the pagination
  const UrlperPage = 3;
  const currentUrls = filteredUrls?.length
    ? filteredUrls.slice(page * UrlperPage - UrlperPage, page * UrlperPage)
    : [];

  const handlePagination = (index) => {
    setpage(index);
  };
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Loading spinner */}
      {urlLoading && clickLoading && <LoadingBar />}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4">
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
        <CreateUrl /> {/* Button to create a new short URL */}
      </div>

      {/* Search Filter */}
      <div className="relative mt-4">
        <Input
          type="text"
          placeholder="Filter Links by Title..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)} // Update search state
          className="pr-10"
        />
        <Filter className="absolute top-2 right-6 text-gray-500" />
      </div>
      <h1 className="text-2xl font-bold text-center sm:text-left  text-gray-500">
        Click the Title to View Analytics
      </h1>

      {/* Error Display */}
      {urlError && <Error message={urlError?.message} />}

      {/* URL Cards */}
      <div className="space-y-4">
        {filteredUrls?.length ? (
          currentUrls.map((url, index) => (
            <UrlCard key={index} url={url} fetchurl={fetchUrls} /> // Render a card for each URL
          ))
        ) : (
          <p className="text-gray-500 text-center sm:text-left">
            No URLs found
          </p> // Display if no URLs match
        )}
      </div>

      {/* Pagination Section */}
      <div>
        {filteredUrls?.length >= 3 && (
          <Pagination
            onPageChange={handlePagination}
            totalUrl={filteredUrls?.length || 0}
            UrlperPage={UrlperPage}
            activePage={page}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
