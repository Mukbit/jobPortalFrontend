import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import { Box, Card, Container, Pagination, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../redux/actions/jobAction";
import { useParams } from "react-router-dom";
import CardElement from "../component/CardElement";
import Footer from "../component/Footer";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
const Home = () => {
  const { jobs, pages } = useSelector((state) => state.loadJobs);

  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { keyword, location } = useParams();
  const [page, setPage] = useState(1);
  const [cat] = React.useState("");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);
  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);
  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <Container>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Box sx={{ flex: 2, p: 2 }}>
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                    Filter job by category
                  </Typography>
                </Box>
              </Card>
              {/* jobs by location */}
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  {/* <h4>Filter by category</h4> */}
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                    Filter job by location
                  </Typography>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {jobs &&
                jobs.map((job, i) => (
                  <CardElement
                    key={i}
                    id={job._id}
                    jobTitle={job.title}
                    description={job.description}
                    category={job.jobType ? job.jobType.jobTypeName : "No category"}
                    location={job.location}
                  />
                ))}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
