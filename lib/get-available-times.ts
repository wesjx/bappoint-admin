export type GetAvailableTimesParams = {
    companyId: string;
    date: string;
    serviceIds?: string[];
  };
  
  export type AvailableTime = {
    start: string;
    end: string;
  };
  
  export async function getAvailableTimes({
    companyId,
    date,
    serviceIds,
  }: GetAvailableTimesParams): Promise<AvailableTime[]> {
    const url = new URL("/api/available-times", window.location.origin);
  
    url.searchParams.set("companyId", companyId);
    url.searchParams.set("date", date);
  
    if (serviceIds && serviceIds.length > 0) {
      url.searchParams.set("serviceIds", serviceIds.join(","));
    }
  
    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch available times: ${response.status} ${
          errorText || response.statusText
        }`
      );
    }
  
    return (await response.json()) as AvailableTime[];
  }
  