// components/FullSizeImage.js
import Image from 'next/image';

const FullSizeImage = ({ src, alt }:{src:any, alt:any}) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
    </div>
  );
};

export default FullSizeImage;