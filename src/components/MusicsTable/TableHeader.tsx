import React from "react";
import { TimeIcon } from "@/icons/MusicsTableIcons";

const TableHeader: React.FC = () => {
  return (
    <thead className="opacity-0 player:opacity-100 ">
      <tr className="text-gray-300 text-base">
        <th className="th px-4 py-2 font-light">#</th>
        <th className="px-4 py-2 font-light">Título</th>
        <th className="album-i th py-2 font-light">Álbum</th>
        <th className="text-center px-4 py-2 font-light">
          <TimeIcon />
        </th>
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
