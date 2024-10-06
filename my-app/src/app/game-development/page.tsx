"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Plus, Import, Save, ChevronRight, Folder, Command, Search, ChevronDown, Volume2, Gamepad, Sun, Globe, Cloud, Box, Camera, Code, Layers, Pause, Play, Users, Wrench, Zap, Cpu, Crosshair, Layout, Image } from 'lucide-react';
import AnimatedZonTitle from '../components/AnimatedZonTitle';
import Sidebar from '../SideMenu';
import html2canvas from 'html2canvas';

const Header = () => (
  <header className="bg-black text-white p-2 flex justify-between items-center">
    <div className="flex items-center space-x-4">
      <nav className="space-x-4">
        <button className="hover:bg-gray-800 px-2 py-1 rounded">Tools</button>
        <button className="hover:bg-gray-800 px-2 py-1 rounded">Build</button>
        <button className="hover:bg-gray-800 px-2 py-1 rounded">Select</button>
        <button className="hover:bg-gray-800 px-2 py-1 rounded">Actor</button>
        <button className="hover:bg-gray-800 px-2 py-1 rounded">Help</button>
      </nav>
    </div>
    <div className="flex items-center space-x-2">
      <span>LevelDesignProject</span>
      <button className="hover:bg-gray-800 p-1 rounded">-</button>
      <button className="hover:bg-gray-800 p-1 rounded">□</button>
      <button className="hover:bg-gray-800 p-1 rounded">×</button>
    </div>
  </header>
);

const Toolbar = () => (
  <div className="bg-black text-white p-2 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <select className="bg-gray-800 rounded px-2 py-1">
        <option>Select Mode</option>
        <option>Translate</option>
        <option>Rotate</option>
        <option>Scale</option>
      </select>
      <div className="flex space-x-1">
        <button className="bg-gray-800 p-1 rounded" title="Add Object"><Plus size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Import Asset"><Import size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Save Scene"><Save size={16} /></button>
      </div>
      <div className="border-l border-gray-700 h-6 mx-2" />
      <div className="flex space-x-1">
        <button className="bg-green-700 p-1 rounded" title="Play"><Play size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Pause"><Pause size={16} /></button>
      </div>
      <div className="border-l border-gray-700 h-6 mx-2" />
      <div className="flex space-x-1">
        <button className="bg-gray-800 p-1 rounded" title="Camera"><Camera size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Lighting"><Zap size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Physics"><Wrench size={16} /></button>
      </div>
      <div className="border-l border-gray-700 h-6 mx-2" />
      <div className="flex space-x-1">
        <button className="bg-gray-800 p-1 rounded" title="Scripting"><Code size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Layers"><Layers size={16} /></button>
        <button className="bg-gray-800 p-1 rounded" title="Multiplayer"><Users size={16} /></button>
      </div>
    </div>
    <div>
      <button className="bg-gray-800 px-2 py-1 rounded flex items-center">
        <Settings size={16} />
        <span className="ml-1">Settings</span>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const GRID_SIZE = 10;
const CELL_SIZE = 60;

interface ImageItem {
  name: string;
  type: string;
  path: string;
}

const Viewport = () => {
    const [grid, setGrid] = useState<(ImageItem | null)[][]>(
      Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
    );
  
    useEffect(() => {
      const handleDragOver = (e: DragEvent) => e.preventDefault();
      const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const cellElement = target.closest('.grid-cell');
        if (!cellElement) return;
  
        const cellX = parseInt(cellElement.getAttribute('data-x') || '0', 10);
        const cellY = parseInt(cellElement.getAttribute('data-y') || '0', 10);
        
        const itemData = e.dataTransfer?.getData('application/json');
        if (!itemData) return;
  
        const item: ImageItem = JSON.parse(itemData);
        
        if (cellX >= 0 && cellX < GRID_SIZE && cellY >= 0 && cellY < GRID_SIZE) {
          const newGrid = [...grid];
          newGrid[cellY][cellX] = item;
          setGrid(newGrid);
        }
      };
  
      document.addEventListener('dragover', handleDragOver);
      document.addEventListener('drop', handleDrop);
      return () => {
        document.removeEventListener('dragover', handleDragOver);
        document.removeEventListener('drop', handleDrop);
      };
    }, [grid]);
  
    const handleSave = async () => {
      const gridElement = document.querySelector('.grid') as HTMLElement;
      if (!gridElement) {
        alert('Grid element not found');
        return;
      }
    
      try {
        const canvas = await html2canvas(gridElement, {
          logging: true,
          width: gridElement.offsetWidth,
          height: gridElement.offsetHeight,
          useCORS: true, // This might help if you have any cross-origin images
        });
        
        const imageData = canvas.toDataURL('image/png');
        console.log('Image data (first 100 chars):', imageData.substring(0, 100));
    
        const response = await fetch('/api/save-map', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData }),
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('Map saved:', result.filePath);
          alert(`Map saved successfully! File path: ${result.filePath}`);
        } else {
          const errorText = await response.text();
          console.error('Server error:', errorText);
          throw new Error(`Failed to save the map: ${errorText}`);
        }
      } catch (error: unknown) {
        console.error('Error saving map:', error);
        if (error instanceof Error) {
          alert(`Failed to save the map. Error: ${error.message}`);
        } else {
          alert('Failed to save the map. An unknown error occurred.');
        }
      }
    };
  
    return (
      <div className="bg-black flex-1 p-4">
        <div className="bg-gray-800 h-full rounded-lg flex flex-col items-center justify-center text-white p-4">
          <h2 className="text-xl mb-4">2D Map Editor</h2>
          <div 
            className="grid gap-1" 
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            }}
          >
            {grid.map((row, y) => 
              row.map((cell, x) => (
                <div 
                  key={`${x}-${y}`} 
                  className="grid-cell bg-gray-700 border border-gray-600 flex items-center justify-center overflow-hidden"
                  style={{ width: CELL_SIZE, height: CELL_SIZE }}
                  data-x={x}
                  data-y={y}
                >
                  {cell && (
                    <img 
                      src={cell.path} 
                      alt={cell.name} 
                      className="w-full h-full object-cover"
                      title={`${cell.name} (${cell.type})`}
                    />
                  )}
                </div>
              ))
            )}
          </div>
          <button 
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={handleSave}
          >
            <Save size={16} className="mr-2" />
            Save Map
          </button>
        </div>
      </div>
    );
  };

const imageItems: ImageItem[] = [
  { name: "Grass", type: "Terrain", path: "/game_images/Grass.png" },
  { name: "Water", type: "Terrain", path: "/game_images/Water.jpeg" },
  { name: "Tree", type: "Object", path: "/game_images/tree-Photoroom.png" },
  { name: "Rock", type: "Object", path: "/game_images/rock-Photoroom.png" },
  { name: "House", type: "Building", path: "/game_images/house-Photoroom.png" },
  { name: "Character", type: "NPC", path: "/game_images/character-Photoroom.png" },
];

const Outliner = ({ onDragStart }: { onDragStart: (item: ImageItem) => void }) => {
  const renderItem = (item: ImageItem) => (
    <div
      key={item.name}
      className="flex items-center ml-4 cursor-move"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
        onDragStart(item);
      }}
    >
      <Image size={16} className="mr-1" />
      <span className="flex-1">{item.name}</span>
      <span className="text-gray-400">{item.type}</span>
    </div>
  );

  return (
    <div className="bg-zinc-900 text-white w-80 p-2 font-sans">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Map Elements</h3>
        <button className="text-gray-400 hover:text-white">×</button>
      </div>
      <div className="relative mb-2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-zinc-800 text-white py-1 px-8 rounded"
        />
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
          <Plus className="text-gray-400 hover:text-white cursor-pointer" size={16} />
          <Settings className="text-gray-400 hover:text-white cursor-pointer" size={16} />
        </div>
      </div>
      <div className="flex text-xs mb-1">
        <div className="flex-1">Item Label</div>
        <div className="w-20 text-right">Type</div>
      </div>
      <div className="space-y-1 text-sm overflow-y-auto" style={{maxHeight: "calc(100vh - 200px)"}}>
        <div className="flex items-center">
          <ChevronDown size={16} className="mr-1" />
          <Folder size={16} className="mr-1 text-yellow-600" />
          <span className="flex-1">Map Elements</span>
          <span className="text-gray-400">Folder</span>
        </div>
        {imageItems.map(renderItem)}
      </div>
      <div className="mt-2 text-xs text-gray-400">{imageItems.length} items</div>
    </div>
  );
};

const ContentBrowser = () => (
  <div className="bg-gray-900 text-white p-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-bold">Content Browser</h3>
      <div className="flex space-x-1">
        <button className="bg-gray-800 p-1 rounded"><Plus size={16} /></button>
        <button className="bg-gray-800 p-1 rounded"><Import size={16} /></button>
        <button className="bg-gray-800 p-1 rounded"><Save size={16} /></button>
      </div>
    </div>
    <div className="flex space-x-2 mb-2">
      <button className="bg-gray-800 px-2 py-1 rounded flex items-center">
        <Folder size={16} />
        <span className="ml-1">Content</span>
        <ChevronRight size={16} />
        <span>StarterContent</span>
      </button>
    </div>
    <div className="grid grid-cols-5 gap-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-gray-800 p-2 rounded text-center">
          <Folder size={24} className="mx-auto mb-1" />
          <span className="text-xs">Folder {i+1}</span>
        </div>
      ))}
    </div>
  </div>
);

const UnrealEngineUI = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragStart = (item: ImageItem) => {
    console.log(`Dragging ${item.name} of type ${item.type}`);
  };

  return (
    <div className="min-h-screen flex text-white"
      style={{
      background: 'linear-gradient(to bottom, #2c007d 0%, #000000 20%, #000000 70%)'
    }}>
      <Sidebar 
        isExpanded={isExpanded} 
        onToggle={() => setIsExpanded(!isExpanded)} 
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <div className="flex-1 flex flex-col ml-6 mr-4 space-y-4">
          <AnimatedZonTitle />
          <Header />
          <Toolbar />
          <div className="flex-1 flex space-x-4">
            <div className="flex-1 flex flex-col space-y-4">
              <Viewport />
              <ContentBrowser />
            </div>
            <Outliner onDragStart={handleDragStart} />
          </div>
          <div className="bg-black p-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="bg-gray-800 px-2 py-1 rounded">Content Drawer</button>
              <button className="bg-gray-800 px-2 py-1 rounded">Output Log</button>
            </div>
            <div className="flex items-center">
              <Command size={16} />
              <input type="text" placeholder="Enter Console Command" className="bg-gray-800 rounded px-2 py-1 ml-2" />
            </div>
            <div className="flex space-x-2">
              <button className="bg-gray-800 px-2 py-1 rounded">Derived Data</button>
              <button className="bg-gray-800 px-2 py-1 rounded">Source Control Off</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnrealEngineUI;

