import React, { useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import CourseCard from "./CourseCard";
import { Pagination } from "react-headless-pagination";
import { fetchCourseInfos } from "../app/courses";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const CoursePage = () => {
  const results = useSelector((state: RootStateOrAny) => state.courses.results);

  return (
    <div className="space-y-4">
      {results.map((course) => (
        <CourseCard info={course} key={course.courseID} />
      ))}
    </div>
  );
};

const CourseList = () => {
  const pages = useSelector(
    (state: RootStateOrAny) => state.courses.totalPages
  );
  const curPage = useSelector((state: RootStateOrAny) => state.courses.page);

  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    dispatch(fetchCourseInfos(page + 1));
  };

  return (
    <div className="p-6">
      <CoursePage />
      <div className="mx-auto my-6">
        <Pagination
          currentPage={curPage - 1}
          setCurrentPage={handlePageClick}
          totalPages={pages}
          className="flex justify-center w-full"
        >
          <Pagination.PrevButton className="">
            <ChevronLeftIcon className="h-5 w-5" />
          </Pagination.PrevButton>

          <div className="flex items-center align-baseline">
            <Pagination.PageButton
              activeClassName="bg-zinc-200"
              inactiveClassName=""
              className="inline-flex h-8 w-8 mx-3 rounded-full justify-center items-center hover:bg-white hover:cursor-pointer"
            />
          </div>

          <Pagination.NextButton>
            <ChevronRightIcon className="h-5 w-5" />
          </Pagination.NextButton>
        </Pagination>
      </div>
    </div>
  );
};

export default CourseList;
