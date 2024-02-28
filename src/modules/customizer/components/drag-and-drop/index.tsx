import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useCustomizer } from "@lib/context/customizer-context";
import Compressor from "compressorjs";
import Spinner from "@modules/common/icons/spinner";
import { medusaUrl } from "@lib/services/config";

interface FileUploaderProps {
  imageSize: any
  instructions: string
}

const FileUploader: React.FC<FileUploaderProps> = ({ imageSize, instructions }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false)
  const uploadRef = useRef<HTMLInputElement>(null);
  const { setCurrent, current } = useCustomizer()

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFiles([...e.dataTransfer.files]);
    const file = e.dataTransfer.files[0];
    handleCompressAndAddFile(file);
    setDrag(false); // reset drag state after file drop

  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true); // set drag state on drag over
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleCompressAndAddFile = async (file: File) => {

    const compressedFile = await new Promise<File | null>((resolve, reject) => {
      if (!file) resolve(null);
      const sizeInKilobytes = file?.size / 1024;
      var quality = 0.8;
      if (sizeInKilobytes > 200) {
        quality = 0.4;
      } else if (sizeInKilobytes < 200 && sizeInKilobytes > 100) {
        quality = 0.6;
      } else if (file?.type?.includes('svg')) {
        quality = 1;
      }

      new Compressor(file, {
        quality,
        mimeType: file.type,
        success(file) {
          var kilobytes = (file.size / 1024);
          resolve(file as File)
        },
        error(error) {
          reject(error)
        },
      });
    });
    if (!compressedFile) return;

    setFiles([compressedFile]);
    let url = await handleUpload(compressedFile)
    setUploading(false);
    if (url) {
      setCurrent({
        ...current,
        ownGraphic: {
          name: file.name,
          file: url,
          size: imageSize,
          instructions,
        }, imageSize
      })
      setFiles([])
      setTimeout(() => {
        setCurrent({ ...current, ownGraphic: undefined })
      }, 1000)
    }
  }

  useEffect(() => {
    if (current?.ownGraphic)
      setCurrent({
        ...current,
        ownGraphic: {
          ...current.ownGraphic,
          instructions,
        },
      })
  }, [instructions])

  const handleFileClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    handleCompressAndAddFile(file)
  };

  const handleUpload = async (file: File): Promise<string | undefined> => {
    setUploading(true);
    var formdata = new FormData();
    formdata.append("file", file, file.name);

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      headers: {
        'mime-type': file.type
      },
      redirect: 'follow'
    };
    try {
      var response = await fetch(medusaUrl + "/store/upload", requestOptions)
      const result = await response.json();
      const { url } = result;
      return url;
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div
      className={`dropzone relative w-full flex flex-col items-center justify-center ${drag ? "dragover" : ""
        }`}
      onClick={() => uploadRef.current && uploadRef.current!.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {uploading && <span className="absolute uppercase rounded backdrop-blur-sm bg-opacity-50 z-20 bg-white p-3 text-center items-center flex  flex-col">
        <Spinner />
        <span >uploading</span>
      </span>}
      {files.length === 0 && <div className="flex items-center justify-center flex-col gap-2">
        <svg
          width="45"
          height="35"
          viewBox="0 0 45 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.5 34V17.5M22.5 17.5L17.125 22.9999M22.5 17.5L27.875 22.9999M9.6 31.2499C4.85036 31.2499 1 27.3804 1 22.6072C1 18.6739 3.61435 15.3543 7.19195 14.3077C7.34398 14.2632 7.45 14.1234 7.45 13.9643C7.45 6.8043 13.2255 1 20.35 1C27.4744 1 33.25 6.8043 33.25 13.9643C33.25 14.1015 33.378 14.2033 33.5113 14.1734C34.1191 14.0364 34.7512 13.9643 35.4 13.9643C40.1496 13.9643 44 17.8338 44 22.6072C44 27.3804 40.1496 31.2499 35.4 31.2499"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-center">
          {drag ? 'Drop file here' : 'Click or drag images here to upload.'}
        </span>
      </div>
      }
      <input ref={uploadRef} type="file" className="hidden" max={1} onChange={handleFileClick} />
      {
        files.length > 0 && <div className="flex justify-start items-center gap-2 flex-wrap overflow-y-scroll h-[200px]">
          {files.map((file) => (
            file?.type?.includes("image") ? (
              <Image
                key={file?.name}
                src={URL.createObjectURL(file)}
                height={120}
                width={120}
                alt="Preview" objectFit="contain" className="rounded" />
            ) : (
              <div key={file?.name} className="flex flex-col bg-gray-50 hover:bg-gray-100 p-5 rounded">
                <Image
                  src={`/file-icons/${file?.type.split('/').at(1)}.png`}
                  objectFit="contain"
                  height={30}
                  width={30}
                  alt="flag"
                />
              </div>
            )
          ))}
        </div>
      }
    </div>
  );
};

export default FileUploader;
