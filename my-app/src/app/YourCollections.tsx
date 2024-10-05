import React, { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';

interface GameInfo {
  title: string;
  image: string;
}

interface CollectionCardProps {
  title: string;
  image: string;
  games: GameInfo[];
  onDelete: () => void;
}

interface CollectionPopupProps {
  collection: CollectionCardProps;
  onClose: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ title, image, onDelete }) => (
  <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[16/9] group">
    <img src={image} alt={title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <button 
      onClick={(e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this collection?')) {
          onDelete();
        }
      }}
      className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <Trash2 size={16} color="white" />
    </button>
  </div>
);

const AddCollectionCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div onClick={onClick} className="relative overflow-hidden rounded-lg shadow-lg aspect-[16/9] bg-black flex items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors duration-300 border border-zinc-700">
    <Plus className="text-white" size={48} />
    <span className="sr-only">Add new collection</span>
  </div>
);

const CollectionPopup: React.FC<CollectionPopupProps> = ({ collection, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-zinc-800 rounded-lg p-4 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">{collection.title}</h3>
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {collection.games.map((game, index) => (
          <div key={index} className="aspect-square bg-zinc-700 rounded-lg overflow-hidden">
            <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const YourCollections: React.FC = () => {
  const [collections, setCollections] = useState<CollectionCardProps[]>([
    {
        title: "Favourites Games",
        image: "/game_images/Game_2.png",
        games: [
            { title: "Game 1", image: "/game_images/Game_1.jpeg" },
            { title: "Game 2", image: "/game_images/Game_2.png" },
            { title: "Game 3", image: "/game_images/Game_3.jpg" },
            { title: "Game 4", image: "/game_images/Game_4.jpg" },
            { title: "Game 5", image: "/game_images/Game_5.jpeg" },
            { title: "Game 6", image: "/game_images/Game_6.jpg" },
        ],
        onDelete: function (): void {
            throw new Error('Function not implemented.');
        }
    },
      {
          title: "PVP Games",
          image: "/game_images/Game_1.jpeg",
          games: [
              { title: "Game 1", image: "/game_images/Game_1.jpeg" },
              { title: "Game 2", image: "/game_images/Game_2.png" },
              { title: "Game 3", image: "/game_images/Game_3.jpg" },
              { title: "Game 4", image: "/game_images/Game_4.jpg" },
          ],
          onDelete: function (): void {
              throw new Error('Function not implemented.');
          }
      },
      {
          title: "Multiplayer Games",
          image: "/game_images/Game_3.jpg",
          games: [
              { title: "Game 1", image: "/game_images/Game_1.jpeg" },
              { title: "Game 2", image: "/game_images/Game_2.png" },
              { title: "Game 3", image: "/game_images/Game_3.jpg" },
              { title: "Game 4", image: "/game_images/Game_4.jpg" },
          ],
          onDelete: function (): void {
              throw new Error('Function not implemented.');
          }
      },
      {
          title: "Open World Games",
          image: "/game_images/Game_4.jpg",
          games: [
              { title: "Game 2", image: "/game_images/Game_2.png" },
              { title: "Game 3", image: "/game_images/Game_3.jpg" },
              { title: "Game 4", image: "/game_images/Game_4.jpg" },
          ],
          onDelete: function (): void {
              throw new Error('Function not implemented.');
          }
      },
      {
          title: "RPG Games",
          image: "/game_images/Game_5.jpeg",
          games: [
              { title: "Game 2", image: "/game_images/Game_2.png" },
              { title: "Game 3", image: "/game_images/Game_3.jpg" },
              { title: "Game 4", image: "/game_images/Game_4.jpg" },
          ],
          onDelete: function (): void {
              throw new Error('Function not implemented.');
          }
      },
      {
          title: "Secret Games",
          image: "/game_images/Game_6.jpg",
          games: [
              { title: "Game 2", image: "/game_images/Game_2.png" },
              { title: "Game 3", image: "/game_images/Game_3.jpg" },
              { title: "Game 4", image: "/game_images/Game_4.jpg" },
          ],
          onDelete: function (): void {
              throw new Error('Function not implemented.');
          }
      },
  ]);

  const [openCollection, setOpenCollection] = useState<CollectionCardProps | null>(null);

  const addNewCollection = () => {
    const newCollection: CollectionCardProps = {
      title: `New Collection ${collections.length + 1}`,
      image: "/game_images/fi_1.jpg",
      games: [],
      onDelete: () => {} // This will be overwritten when we map over the collections
    };
    setCollections([...collections, newCollection]);
  };

  const deleteCollection = (index: number) => {
    const newCollections = collections.filter((_, i) => i !== index);
    setCollections(newCollections);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Your Collections</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AddCollectionCard onClick={addNewCollection} />
        {collections.map((collection, index) => (
          <div key={index} onClick={() => setOpenCollection(collection)}>
            <CollectionCard 
              title={collection.title} 
              image={collection.image} 
              games={collection.games} 
              onDelete={() => deleteCollection(index)}
            />
          </div>
        ))}
      </div>
      {openCollection && (
        <CollectionPopup
          collection={openCollection}
          onClose={() => setOpenCollection(null)}
        />
      )}
    </div>
  );
};

export default YourCollections;



// {
//     title: "Favourites Games",
//     image: "/game_images/Game_2.png",
//     games: [
//       { title: "Game 1", image: "/game_images/Game_1.jpeg" },
//       { title: "Game 2", image: "/game_images/Game_2.png" },
//       { title: "Game 3", image: "/game_images/Game_3.jpg" },
//       { title: "Game 4", image: "/game_images/Game_4.jpg" },
//       { title: "Game 5", image: "/game_images/Game_5.jpeg" },
//       { title: "Game 6", image: "/game_images/Game_6.jpg" },
//     ]
//   },
//   {
//     title: "PVP Games",
//     image: "/game_images/Game_1.jpeg",
//     games: [
//       { title: "Game 1", image: "/game_images/Game_1.jpeg" },
//       { title: "Game 2", image: "/game_images/Game_2.png" },
//       { title: "Game 3", image: "/game_images/Game_3.jpg" },
//       { title: "Game 4", image: "/game_images/Game_4.jpg" },
//     ]
//   },
//   {
//     title: "Multiplayer Games",
//     image: "/game_images/Game_3.jpg",
//     games: [
//       { title: "Game 1", image: "/game_images/Game_1.jpeg" },
//       { title: "Game 2", image: "/game_images/Game_2.png" },
//       { title: "Game 3", image: "/game_images/Game_3.jpg" },
//       { title: "Game 4", image: "/game_images/Game_4.jpg" },
//     ]
//   },
//   {
//     title: "Open World Games",
//     image: "/game_images/Game_4.jpg",
//     games: [
//       { title: "Game 2", image: "/game_images/Game_2.png" },
//       { title: "Game 3", image: "/game_images/Game_3.jpg" },
//       { title: "Game 4", image: "/game_images/Game_4.jpg" },
//     ]
//   },
//   {
//     title: "RPG Games",
//     image: "/game_images/Game_5.jpeg",
//     games: [
//       { title: "Game 2", image: "/game_images/Game_2.png" },
//       { title: "Game 3", image: "/game_images/Game_3.jpg" },
//       { title: "Game 4", image: "/game_images/Game_4.jpg" },
//     ]
//   },
//   {
//     title: "Secret Games",
//     image: "/game_images/Game_6.jpg",
//     games: [
//       { title: "Game 2", image: "/game_images/Game_2.png" },
//       { title: "Game 3", image: "/game_images/Game_3.jpg" },
//       { title: "Game 4", image: "/game_images/Game_4.jpg" },
//     ]
//   },