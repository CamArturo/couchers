import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { StringValue } from "google-protobuf/google/protobuf/wrappers_pb";
import { Area, UserSearchReq } from "pb/search_pb";
import client from "service/client";

export interface UserSearchFilters {
  query?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  lastActive?: number; //within x days
}

export async function userSearch(
  { query, lat, lng, radius, lastActive }: UserSearchFilters,
  pageToken: string = ""
) {
  const req = new UserSearchReq();
  req.setPageToken(pageToken);

  if (query !== undefined) {
    req.setQuery(new StringValue().setValue(query));
  }

  if (lat !== undefined && lng !== undefined) {
    const area = new Area().setLat(lat).setLng(lng);
    if (radius) {
      area.setRadius(radius);
      req.setSearchInArea(area);
    } else {
      throw Error("Tried to search an area without a radius");
    }
  }

  if (lastActive) {
    const timestamp = new Timestamp();
    timestamp.fromDate(new Date(Date.now() - 1000 * 60 * 60 * 24 * lastActive));
    req.setLastActive(timestamp);
  }

  const response = await client.search.userSearch(req);
  return response.toObject();
}
