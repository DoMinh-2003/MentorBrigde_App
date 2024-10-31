/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { ADMIN_API, TEAM_API } from "../constants/endpoints";

import useApi from "@/hooks/useApi";

const useStudentService = () => {
  const { callApi, loading, setIsLoading } = useApi();
  


  const getUserTeam = useCallback(
    async (teamCode?: string) => {
      try {
        setIsLoading(true);
        // check PATH
        const PATH = teamCode ? TEAM_API.TEAM + teamCode : TEAM_API.TEAM;
        const response = await callApi("get", PATH);
        return response?.data;
      } catch (e: any) {
        return null;
        console.error("Fetch User Team Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

    const createTeam = useCallback(async () => {

      try {
        setIsLoading(true);
        const response = await callApi("post", TEAM_API.TEAM);
        await getUserTeam();
        return response?.data;
      } catch (e: any) {
        console.error("Create Team Error: ", e);
      } finally {
        setIsLoading(false);
      }
    }, [callApi, getUserTeam]);

  const searchTeamMembers = useCallback(
    async (searchTerm: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "get",
          `${ADMIN_API.ADMIN}?search=${searchTerm}&role=STUDENT`
        );
        return response?.data;
      } catch (e: any) {
        console.error("Search Team Members Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const inviteToGroup = useCallback(
    async (email: string,teamCode: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "post",
          `team/invite?email=${email}&teamCode=${teamCode}`
        );

        return response?.data;
      } catch (e: any) {
        console.error("Invite to Group Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const acceptInvitation = useCallback(
    async (token: string, teamCode: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `accept-invitation?token=${token}&teamCode=${teamCode}`
        );
        return response?.message;
      } catch (e: any) {
        console.error("Invite to Group Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return {
    loading,
    createTeam,
    getUserTeam,
    searchTeamMembers,
    inviteToGroup,
    acceptInvitation,
  };
};

export default useStudentService;
