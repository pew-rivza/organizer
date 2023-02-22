import React from "react";
import ImageUploader, { ImageListType } from "react-images-uploading";

import { Icon } from "@iconify/react";
import { useStore } from "effector-react";

import { joinCn } from "utils/joinCn";

import { $changedClothes, updateChangedClothes } from "VW_models/clothes";
import { ChangedClothes } from "VW_types/stores";

import "./Uploader.scss";

export const Uploader: React.FC = () => {
  const changedClothes = useStore<ChangedClothes>($changedClothes);

  const onChange = (imageList: ImageListType): void => {
    updateChangedClothes({
      ...changedClothes,
      image: imageList[0],
    });
  };

  return (
    <ImageUploader
      value={changedClothes.image ? [changedClothes.image] : []}
      onChange={onChange}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => {
        const dropzoneCn = joinCn(
          "vw_clothes_form-dropzone",
          isDragging && "vw_clothes_form-dropzone-dragging",
        );

        return (
          <React.Fragment>
            {!changedClothes.image && (
              <div
                className={dropzoneCn}
                onClick={onImageUpload}
                {...dragProps}
              >
                <Icon icon="material-symbols:add-a-photo-outline" />
              </div>
            )}

            {imageList[0] && (
              <div className="vw_clothes_form-image">
                <img
                  src={imageList[0]["data_url"]}
                  alt={imageList[0].file?.name || ""}
                />

                <div className="vw_clothes_form-image-toolbar">
                  <button
                    className="icon-button vw_clothes_form-image-toolbar-update"
                    onClick={() => onImageUpdate(0)}
                  >
                    <Icon icon="radix-icons:update" />
                  </button>
                  <button
                    className="icon-button vw_clothes_form-image-toolbar-remove"
                    onClick={() => {
                      onImageRemove(0);
                      updateChangedClothes({ ...changedClothes, image: null });
                    }}
                  >
                    <Icon icon="radix-icons:cross-2" />
                  </button>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      }}
    </ImageUploader>
  );
};
