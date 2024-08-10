import { UseHookFormParams } from "@/app/products/upload/page";
import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  detailPage?: boolean;
  setCustomValue?: (id: keyof UseHookFormParams, value: any) => void;
}

const KakaoMap = ({
  latitude,
  longitude,
  detailPage = false,
  setCustomValue,
}: KakaoMapProps) => {
  const handleClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
    if (detailPage) {
      return;
    }
    setCustomValue!("latitude", mouseEvent.latLng.getLat());
    setCustomValue!("longitude", mouseEvent.latLng.getLng());
  };

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "360px" }}
      onClick={(_, mouseEvent) => {
        handleClick(mouseEvent);
      }}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
    </Map>
  );
};

export default KakaoMap;
