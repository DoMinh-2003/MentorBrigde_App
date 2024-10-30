/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { TEAM_API, TOPIC_API } from "../constants/endpoints";
import api from "../config/api";
import useApi from "@/hooks/useApi";

const useTopicService = () => {
  const { callApi, loading, setIsLoading } = useApi();

  // const createTopic = useCallback(
  //   async (
  //     topicData: { name: string; description: string; teamId: string | null },
  //     file: File
  //   ) => {
  //     try {
  //       setIsLoading(true);
  //       const formData = new FormData();
  //       const jsonBlob = new Blob([JSON.stringify(topicData)], {
  //         type: "application/json",
  //       });
  //       formData.append("topic", jsonBlob);

  //       formData.append("file", file);

  //       const response = await api.post(TOPIC_API.TOPIC, formData);

  //       return response?.data;
  //     } catch (e: any) {
  //       console.error("Create Topic Error: ", e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [callApi]
  // );

  const getTopics = useCallback(
    async (queryParams: {
      name?: string;
      status?: string;
      page?: number;
      size?: number;
      sortBy?: string;
      sortDirection?: string;
      semesterCode?: string;
    }) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams(queryParams as any).toString();
        const response = await callApi("get", `${TOPIC_API.TOPIC}?${params}`);
        return response?.data;
      } catch (e: any) {
       
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );
  // const acceptTopic = useCallback(
  //   async (id: string) => {
  //     try {
  //       setIsLoading(true);
  //       const response = await callApi(
  //         "patch",
  //         `${TOPIC_API.TOPIC_ACCEPTED}/${id}`
  //       );

  //       return response?.data;
  //     } catch (e: any) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [callApi, setIsLoading]
  // );

  // Reject Topic (PATCH /api/topic/rejected/{id})
  // const rejectTopic = useCallback(
  //   async (id: string) => {
  //     try {
  //       setIsLoading(true);
  //       const response = await callApi(
  //         "patch",
  //         `${TOPIC_API.TOPIC_REJECT}/${id}`
  //       );

  //       return response?.data;
  //     } catch (e: any) {
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   [callApi, setIsLoading]
  // );

  const bookTopic = useCallback(
    async (id: string) => {
      try {

        setIsLoading(true);
        const response = await callApi(
          "put",
          `${TEAM_API.TEAM}/topic?topicId=${id}`
        );
        console.log("Choose topic successfully!");
        return response?.message;
      } catch (e: any) {
        console.log(e?.response?.data || "Failed to choose topic");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return { getTopics, loading , bookTopic };
};

export default useTopicService;
