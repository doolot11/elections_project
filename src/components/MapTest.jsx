import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TooltipCustom from '../ui/Tooltip';
import { fetchData } from '../services/requests';

const MapTest = ({ setData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [datan,setDatan] = useState({})

  const paths = [
    { id: 1, data: { name: "Баткен" }, d: 'm 142.46619,280.38875 0.97,0.51 2.46,-0.06 1.08,1.54 -0.12,0.89 0.64,0.25 3.48,-0.69 0.38,0.59 2.13,0.56 2.06,1.31 0.19,0.97 2.3,1.02 3.25,-0.45 1.14,3.88 0.91,1.03 2.06,0.4 3.6,-0.34 1.2,-0.91 0.06,-3.08 0.8,-0.57 1.49,0 1.43,0.8 1.26,2.91 0.63,2.06 -1.09,2.56 1.04,0.9 0.85,2.66 0.8,0 1.66,-2.17 2.34,-1.6 0.4,0.29 2.74,-2 0.91,-0.4 0.75,0.3 0.54,-0.49 0.03,-1.58 -1.43,-1.03 1.1,-1.75 2.96,-0.3 2.91,1.77 1.22,0.2 2.72,-2.6 2.91,-0.23 -0.27,-1.87 0,0 3.41,-1.63 6.43,-1.77 1.4,0 0.93,0.75 0.37,1.12 -1.02,4.19 1.49,1.86 0,0.75 -2.7,1.96 0.65,0.75 4.29,1.68 1.12,1.02 0.47,1.3 0,1.3 -2.98,2.61 3.07,1.02 0.93,0.65 0.37,1.02 -0.84,2.79 1.3,1.86 0.09,1.21 -1.58,4 0.09,1.3 3.91,0.75 2.61,1.68 1.96,4.94 1.58,2.05 1.3,0 1.12,-1.4 0.84,-0.28 1.58,0.65 0.28,0.93 1.02,0.84 -1.02,1.12 1.49,1.03 2.24,2.7 0.65,2.51 -0.93,0.65 -0.28,1.96 -2.42,1.58 -5.4,1.77 -0.75,0.93 -2.42,0.28 -2.33,2.79 -3.45,0.84 -0.93,0.75 -3.17,0.93 -2.14,-1.21 -3.26,-0.28 -1.68,0.19 -3.63,1.68 -1.58,-1.68 -3.82,-0.09 -3.54,-2.79 -2.7,-0.37 -3.17,0.47 -2.33,-1.96 -3.35,-0.47 -1.68,-0.75 -1.12,-0.84 -0.47,-1.58 -4.01,-0.56 -1.68,3.26 -1.21,0.75 -5.68,0.56 -0.84,0.56 -2.7,4.75 -0.37,2.89 -0.98,1.34 0,0 -1.41,-0.9 -0.8,0.06 0.06,1.26 -4.11,0.97 -0.69,2 -0.69,0.4 -2.97,-0.29 -2.08,0.8 -0.55,2.28 -1.77,2.11 -1.83,-0.23 -0.69,-1.31 -0.8,0 -4.11,2.29 -5.44,-0.69 -1.6,0.34 -0.74,0.51 -0.4,1.31 -0.51,5.6 -1.6,2 -1.49,0.34 -2.23,-0.34 -3.88,-2.11 -1.83,3.54 -1.66,-0.34 -0.8,-1.03 -1.03,-0.17 -2.11,1.94 -1.83,0.11 -2.69,-0.91 -2.17,-1.88 0.61,-5.06 -1.41,-1.96 -3.43,-1.88 -2.63,-5.77 -0.969996,-0.69 -5.32,-1.02 -2.28,-2.46 -0.97,0.17 -0.8,1.14 -2.23,0.29 -1.17,1.23 -2.37,-0.32 -1.43,1.77 -3.54,-1.65 -1.03,2.1 -1.44,1.22 -1.65,2.67 -3.43,-0.06 -0.91,-0.8 -0.23,-2 -1.6,-1.37 -0.91,-0.06 -2.34,1.71 -0.97,-0.11 -3.43,-3.14 -2.53,1.46 -0.58,1.18 -2.15,-0.46 -1.82,2.68 -1.43,0.11 -1.2,-2.68 -2.11,-0.06 -2.8,-0.97 -0.8,0.51 -0.86,2.74 -1.81,0.81 -5.45,-4.18 -5.08,-1.71 -1.54,0.06 -1.2,1.14 -1.48,0.17 -1.6,-0.46 -0.61,-0.73 -1.34,0.33 -2.07,2.75 -1.28,0.11 -0.82,0.75 0.06,0.8 -1.94,-0.06 -2.87,0.92 -0.87,-0.65 -1.52,0.7 -2.17,-0.74 -0.86,-1.71 -1.0399996,0 -0.62,2.51 -1.32,1.08 -1.94,-1.54 0.06,-1.88 0.86,-1.09 0.23,-1.6 -2.11,-6.28 -0.06,-4 -0.63,-2.29 -2.8,-3.51 0,-3.73 -1.02999999,-0.89 -0.07,-1.08 4.85999999,-5.51 -2.29,-3.23 1.31,-3.83 2.34,-1.91 0.63,-1.49 -1.6,-2.4 0.51,-0.69 0.8,0.34 1.14,1.94 1.77,-0.17 1.4299996,1.03 1.14,1.77 0.29,4.23 2.57,0.4 1.83,-1.57 1.66,-0.31 1.94,0.63 0.4,-0.46 -2.57,-3.94 -0.57,-2.4 0.91,-9.6 0.8,-0.63 1.49,0.11 2.11,1.37 5.03,-2 1.54,0.06 0.34,0.86 1.03,-0.11 1.94,-3.14 3.88,-2.28 4.68,-1.54 3,0.11 3.2,-0.8 6.11,-2.46 1.31,0.06 5.37,3.14 3.83,3.77 1.2,0.11 0.86,-0.91 1.14,0.46 0.23,1.43 1.31,1.43 4.34,-0.34 1.09,0.4 2.46,1.49 1.83,0.17 0.11,1.2 0.63,0.57 4.51,2.46 8.34,2.23 2.06,1.31 0.74,0.69 -0.4,1.43 -2.4,1.31 -3.37,2.86 -0.4,3.43 0.51,1.2 1.03,0.17 -0.15,-2.72 0.49,-1.79 0.69,-0.51 2.17,0.11 4.34,-2.46 -0.23,-1.89 1.31,-1.88 0.74,-6.83 2.169996,-0.91 8.11,-1.6 1.09,-1.89 -0.23,-2.46 1.94,-0.69 0.8,0.69 1.57,-0.43 2.48,-1.62 5.54,-2.23 0.9,-2.34 -1.83,-3.08 0.46,-1.09 1.54,-0.51 4.86,-0.17 3.43,-2.11 2.51,-3.08 3.31,-0.34 4.22,0.37 z m -13.75,11.81 0.58,-1.12 0.04,-1.62 -0.73,-0.96 -0.77,0.96 0.42,2.39 0.46,0.35 z m 45.22,2 0.25,-0.95 -1.9,-0.55 0,1.25 0.5,0.15 1.15,0.1 z m -47.57,4.13 0.19,3.08 -0.58,4.32 0.62,2.31 1.16,1.62 1.46,0.85 3.01,0.46 0.85,0.5 0.15,0.85 -0.31,1.27 -1.04,0.42 1.35,2.58 -2.51,2.43 -0.58,1.97 -1.23,0.93 0.27,0.69 2,0.23 1.35,1.19 0.54,-0.66 -0.73,-0.85 0.19,-0.89 0.85,-1.04 1.04,0.23 -0.19,2.12 0.58,0.31 3.59,-0.5 2.39,-2.66 0.15,-0.69 -0.85,-0.85 0.15,-1.08 -0.81,-0.5 -4.16,0.15 -0.08,-0.73 1.46,-0.66 0.39,-0.81 -0.23,-1.08 -1.12,-1.23 1.7,-0.54 2.2,-1.54 0.31,-0.66 -0.35,-1.04 -4.05,2 -0.89,-0.08 -1.58,-6.25 -1.47,-0.66 -0.77,-1 -0.62,-3.2 -1.58,-3.12 -2.16,-1.04 -1.04,0.58 0.19,0.73 0.79,1.54 z m 52.67,19.99 2.74,-1.92 3.63,0.48 0.96,-2.19 -5.21,-4.32 -0.75,0.89 0.82,2.26 -1.51,1.23 -2.54,0.62 -0.27,1.1 2.13,1.85 z m -87.539996,5.29 -0.61,1.22 1.62,2.84 0.32,2.63 1.04,0.17 2.4,-0.93 0.58,0.35 0.49,0.98 -0.87,2.43 0.26,1.16 2.23,-1.5 2.429996,-3.47 3.33,-1.42 1.56,-2.08 -0.43,-1.42 -1.13,-0.23 -3.07,0.84 -2.489996,-0.06 -5.44,-1.68 -2.22,0.17 z' }, // Прямоугольник 1
    { id: 2, data: { name: "Иссык-Куль" }, d: 'm 358.57619,2.2387509 2,0 2.06,2.68 1.82,-0.17 0,0.92 0.58,0.4 0.85,0.45 0.97,-0.23 0.46,0.8 0.91,-0.22 2.35,2.57 2.74,1.0200001 0.51,0.92 2,-0.57 1.2,1.03 4.92,1.31 0.45,1.43 4.29,5.37 2.05,1.83 1.89,0.74 1.2,2.17 2.68,1.77 1.43,0.23 1.66,-0.74 0.97,0.28 1.69,-0.86 0.97,0.29 5.03,2.29 1.08,1.08 7.09,3.71 5.2,1.49 3.37,2.34 3.25,0.92 2.34,1.88 4.46,-0.23 4.17,1.2 3.13,0 5.66,1.26 3.31,-0.46 15.54,4.11 2.34,-3.37 1.02,-0.61 1.46,-6.04 1.59,-2.03 2.33,-1.83 5.48,-1.54 1.2,0.34 1.31,2 2.91,0.34 2.11,1.66 1.66,0 6,-1.66 4,0.12 1.08,0.86 5.49,0.11 1.2,0.69 0.6,3.91 1.22,0.66 1.95,0.11 9.7,-2.79 0.92,-1.78 0.8,-0.53 5.29,0.9 1.33,-0.71 2.73,0.71 5.66,-0.03 1.6,-0.97 0.68,-1.17 0.12,-1.74 0.75,-0.69 4.05,-0.28 1.09,-1.94 0.85,-0.12 5.03,0.86 1.72,-1.09 3.07,-0.43 1.08,0.46 1.67,2.54 1.09,-0.11 2.39,-2.03 4.28,0.34 1.26,0.35 0.45,2.11 1.96,0.26 2.9,2.29 -0.85,1.31 -2.73,0.68 -3.18,2.84 -1.48,4.77 -1.13,0.57 -2.73,-0.45 -10.57,1.36 -1.47,0.45 -0.69,0.8 -2.95,-0.34 -4.54,2.04 -1.71,0.23 -4.88,-0.68 -2.62,1.14 -2.38,-0.34 -1.82,0.79 -3.52,-0.57 -2.05,0.46 -1.02,-0.91 -1.93,-0.12 -0.11,2.28 -2.73,0.34 -1.59,0.79 -2.5,-0.34 -1.93,2.05 -6.59,4.2 -1.82,2.05 -2.5,1.13 -0.34,2.62 -1.02,0.68 -1.48,0.45 -1.59,-0.68 -3.3,0 -1.93,0.45 -1.13,0.91 -4.55,0.8 -0.79,0.91 -3.87,-0.12 -2.61,0.57 -2.5,-1.13 -2.27,-0.35 -0.57,1.25 0.57,2.28 -0.12,2.04 -3.52,0.12 -1.36,1.13 -1.48,0 -0.91,0.8 -1.47,3.41 -3.64,2.61 -1.25,1.48 -3.98,1.7 -1.47,-0.91 -1.25,-0.11 -0.57,-1.03 0.11,-1.02 -1.02,-0.23 -0.45,0.8 -1.25,0.57 -1.94,0.57 -1.93,-0.34 -1.59,0.56 -2.61,-1.81 -1.14,1.47 -3.18,0.12 -2.72,1.13 -5,-1.82 -3.18,0.8 -1.37,-0.45 -0.91,-1.03 -3.06,2.16 -2.84,0.12 -1.14,-1.71 -1.14,-0.34 -2.27,1.25 -5.11,-0.8 -1.14,0.57 -7.61,0.68 0.34,1.6 2.27,2.61 0.8,2.16 1.36,1.81 0.46,2.62 -1.03,0.79 -1.81,-0.45 -3.75,0.45 -1.71,0.8 -2.38,3.07 -2.73,2.15 -2.84,-0.45 -4.95,1.76 -2.39,-0.11 -3.18,0.789999 -2.39,-0.56 -2.72,0.9 -2.73,0.23 -3.07,-0.57 -1.93,8.98 1.14,1.02 3.29,1.48 0.34,1.02 -0.91,0.34 -0.91,1.48 -1.47,0.34 -1.37,1.14 -0.56,1.13 0.9,3.41 -0.68,1.7 -2.72,1.37 -0.96,5.51 -1.93,0.34 -2.39,-0.68 -1.36,0.57 -1.14,1.02 -1.81,5.45 -1.25,0.91 -1.48,-1.7 1.7,-4.89 -0.45,-0.57 -3.86,0.68 -1.48,-0.34 -0.68,-1.59 -2.73,-2.5 -1.13,-1.81 -1.71,1.7 -1.14,-0.23 -1.81,0.8 -5.12,0 -0.79,-0.68 -2.95,0.68 -0.67,-0.37 0,0 -0.07,-2.05 -0.61,-0.68 -0.46,-2.21 -1.06,-0.53 -3.2,-0.46 -8.28,1.98 -1.22,-0.91 -0.99,-0.08 -0.84,0.91 -2.2,-0.22 -1.29,-1.37 -2.06,0.15 -6.84,-2.13 -1.45,0.38 -1.59,-1.37 -0.84,-3.42 -1.22,-1.67 -7.83,-2.13 -3.25,0.3 -2.23,-0.88 0,0 -0.36,-1.75 0.49,-2.76 -3.25,-1.18 -1.37,-1.87 0.29,-5.119999 0.79,-0.69 4.33,1.38 4.43,-3.84 1.08,-0.2 1.48,0.6 3.54,-1.28 4.14,1.08 2.65,-2.36 4.14,-0.3 4.43,1.48 7.38,-2.56 1.18,-1.38 0.2,-3.15 2.76,-3.35 0.69,-2.06 0,-1.87 -2.27,-1.58 -1.28,1.08 -1.08,-0.19 -0.69,-1.87 -1.08,-1.09 -1.38,0.3 -0.1,2.16 -1.08,3.35 -0.79,0.3 -1.08,-0.55 0.13,-1.5 -2.68,-2.57 -2.63,-5.12 -1.2,-4.39 0.06,-5.37 1.67,-4.35 0.33,-3.01 2.17,-4.24 1.64,-2.06 0.75,-7.62 -0.45,-3.49 -0.96,-2.23 0.46,-2.17 2.62,-2.63 -0.12,-4.62 0.81,-2 3.54,-0.86 2.64,-1.44 2.16,-2.1 3.66,-1.89 4.4,-3.25 0.66,0.85 1.37,0.46 0.97,-1.03 5.45,0.52 1.54,-1.55 0.32,-1.05 0.55,0.17 2.37,-6.8300001 3.31,1.2 1.31,2.17 1.78,0.91 1.48,-0.51 1.54,-1.43 7.37,-0.39 1.09,-0.52 0.45,-1.08 -2.05,-3.66 0.45,-1.6 1.78,1.26 z' }, // Прямоугольник 2
    { id: 3, data: { name: "Чуй" }, d: 'm 358.57619,2.2387509 2,0 2.06,2.68 1.82,-0.17 0,0.92 0.58,0.4 0.85,0.45 0.97,-0.23 0.46,0.8 0.91,-0.22 2.35,2.57 2.74,1.0200001 0.51,0.92 2,-0.57 1.2,1.03 4.92,1.31 0.45,1.43 4.29,5.37 2.05,1.83 1.89,0.74 1.2,2.17 2.68,1.77 1.43,0.23 1.66,-0.74 0.97,0.28 1.69,-0.86 0.97,0.29 5.03,2.29 1.08,1.08 7.09,3.71 5.2,1.49 3.37,2.34 3.25,0.92 2.34,1.88 4.46,-0.23 4.17,1.2 3.13,0 5.66,1.26 3.31,-0.46 15.54,4.11 2.34,-3.37 1.02,-0.61 1.46,-6.04 1.59,-2.03 2.33,-1.83 5.48,-1.54 1.2,0.34 1.31,2 2.91,0.34 2.11,1.66 1.66,0 6,-1.66 4,0.12 1.08,0.86 5.49,0.11 1.2,0.69 0.6,3.91 1.22,0.66 1.95,0.11 9.7,-2.79 0.92,-1.78 0.8,-0.53 5.29,0.9 1.33,-0.71 2.73,0.71 5.66,-0.03 1.6,-0.97 0.68,-1.17 0.12,-1.74 0.75,-0.69 4.05,-0.28 1.09,-1.94 0.85,-0.12 5.03,0.86 1.72,-1.09 3.07,-0.43 1.08,0.46 1.67,2.54 1.09,-0.11 2.39,-2.03 4.28,0.34 1.26,0.35 0.45,2.11 1.96,0.26 2.9,2.29 -0.85,1.31 -2.73,0.68 -3.18,2.84 -1.48,4.77 -1.13,0.57 -2.73,-0.45 -10.57,1.36 -1.47,0.45 -0.69,0.8 -2.95,-0.34 -4.54,2.04 -1.71,0.23 -4.88,-0.68 -2.62,1.14 -2.38,-0.34 -1.82,0.79 -3.52,-0.57 -2.05,0.46 -1.02,-0.91 -1.93,-0.12 -0.11,2.28 -2.73,0.34 -1.59,0.79 -2.5,-0.34 -1.93,2.05 -6.59,4.2 -1.82,2.05 -2.5,1.13 -0.34,2.62 -1.02,0.68 -1.48,0.45 -1.59,-0.68 -3.3,0 -1.93,0.45 -1.13,0.91 -4.55,0.8 -0.79,0.91 -3.87,-0.12 -2.61,0.57 -2.5,-1.13 -2.27,-0.35 -0.57,1.25 0.57,2.28 -0.12,2.04 -3.52,0.12 -1.36,1.13 -1.48,0 -0.91,0.8 -1.47,3.41 -3.64,2.61 -1.25,1.48 -3.98,1.7 -1.47,-0.91 -1.25,-0.11 -0.57,-1.03 0.11,-1.02 -1.02,-0.23 -0.45,0.8 -1.25,0.57 -1.94,0.57 -1.93,-0.34 -1.59,0.56 -2.61,-1.81 -1.14,1.47 -3.18,0.12 -2.72,1.13 -5,-1.82 -3.18,0.8 -1.37,-0.45 -0.91,-1.03 -3.06,2.16 -2.84,0.12 -1.14,-1.71 -1.14,-0.34 -2.27,1.25 -5.11,-0.8 -1.14,0.57 -7.61,0.68 0.34,1.6 2.27,2.61 0.8,2.16 1.36,1.81 0.46,2.62 -1.03,0.79 -1.81,-0.45 -3.75,0.45 -1.71,0.8 -2.38,3.07 -2.73,2.15 -2.84,-0.45 -4.95,1.76 -2.39,-0.11 -3.18,0.789999 -2.39,-0.56 -2.72,0.9 -2.73,0.23 -3.07,-0.57 -1.93,8.98 1.14,1.02 3.29,1.48 0.34,1.02 -0.91,0.34 -0.91,1.48 -1.47,0.34 -1.37,1.14 -0.56,1.13 0.9,3.41 -0.68,1.7 -2.72,1.37 -0.96,5.51 -1.93,0.34 -2.39,-0.68 -1.36,0.57 -1.14,1.02 -1.81,5.45 -1.25,0.91 -1.48,-1.7 1.7,-4.89 -0.45,-0.57 -3.86,0.68 -1.48,-0.34 -0.68,-1.59 -2.73,-2.5 -1.13,-1.81 -1.71,1.7 -1.14,-0.23 -1.81,0.8 -5.12,0 -0.79,-0.68 -2.95,0.68 -0.67,-0.37 0,0 -0.07,-2.05 -0.61,-0.68 -0.46,-2.21 -1.06,-0.53 -3.2,-0.46 -8.28,1.98 -1.22,-0.91 -0.99,-0.08 -0.84,0.91 -2.2,-0.22 -1.29,-1.37 -2.06,0.15 -6.84,-2.13 -1.45,0.38 -1.59,-1.37 -0.84,-3.42 -1.22,-1.67 -7.83,-2.13 -3.25,0.3 -2.23,-0.88 0,0 -0.36,-1.75 0.49,-2.76 -3.25,-1.18 -1.37,-1.87 0.29,-5.119999 0.79,-0.69 4.33,1.38 4.43,-3.84 1.08,-0.2 1.48,0.6 3.54,-1.28 4.14,1.08 2.65,-2.36 4.14,-0.3 4.43,1.48 7.38,-2.56 1.18,-1.38 0.2,-3.15 2.76,-3.35 0.69,-2.06 0,-1.87 -2.27,-1.58 -1.28,1.08 -1.08,-0.19 -0.69,-1.87 -1.08,-1.09 -1.38,0.3 -0.1,2.16 -1.08,3.35 -0.79,0.3 -1.08,-0.55 0.13,-1.5 -2.68,-2.57 -2.63,-5.12 -1.2,-4.39 0.06,-5.37 1.67,-4.35 0.33,-3.01 2.17,-4.24 1.64,-2.06 0.75,-7.62 -0.45,-3.49 -0.96,-2.23 0.46,-2.17 2.62,-2.63 -0.12,-4.62 0.81,-2 3.54,-0.86 2.64,-1.44 2.16,-2.1 3.66,-1.89 4.4,-3.25 0.66,0.85 1.37,0.46 0.97,-1.03 5.45,0.52 1.54,-1.55 0.32,-1.05 0.55,0.17 2.37,-6.8300001 3.31,1.2 1.31,2.17 1.78,0.91 1.48,-0.51 1.54,-1.43 7.37,-0.39 1.09,-0.52 0.45,-1.08 -2.05,-3.66 0.45,-1.6 1.78,1.26 z' }, // Прямоугольник 3
    { id: 4, data: { name: "Джалал-Абад" }, d: 'm 216.30619,101.41875 6.8,1.08 1.47,0.88 1.87,2.86 1.38,0.39 3.45,-0.98 2.95,2.26 1.77,-0.19 4.23,2.26 4.73,-0.39 5.02,2.46 6.26,4.82 5.02,-0.59 0.89,-2.95 2.75,-1.28 2.17,-2.96 0.69,-0.19 1.57,1.57 1.97,-1.28 0.79,1.48 1.38,-0.3 1.57,0.59 2.33,-1 0,0 2.23,0.88 3.25,-0.3 7.83,2.13 1.22,1.67 0.84,3.42 1.59,1.37 1.45,-0.38 6.84,2.13 2.06,-0.15 1.29,1.37 2.2,0.22 0.84,-0.91 0.99,0.08 1.22,0.91 8.28,-1.98 3.2,0.46 1.06,0.53 0.46,2.21 0.61,0.68 0.07,2.05 0,0 0.84,0.46 -1.22,2.05 -3.95,4.11 0.15,0.53 3.8,1.98 1.14,0.07 1.22,-1.06 0.61,0.08 2.35,2.2 2.67,-0.61 0.91,0.46 2.89,0 1.21,0.91 0.46,1.52 -0.3,3.12 1.82,3.88 1.6,1.06 4.03,0 0.99,0.69 -0.54,3.95 0.61,1.45 0.38,5.01 -0.91,2.28 -1.14,0.08 -1.52,-2.05 0,-1.45 0.84,-1.75 -0.54,-1.06 -2.35,-1.98 -3.88,-0.83 -2.13,-1.45 -1.9,0.61 -0.08,0.84 2.66,6.08 2.1,0.88 0.41,1.35 1.35,1.35 3.25,2.17 2.57,0.4 3.65,-0.54 2.17,0.41 2.84,1.76 2.03,-1.36 6.89,-0.67 3.93,1.08 1.75,1.49 1.49,0 2.71,-3.38 3.65,-0.95 5.95,-0.27 2.57,-0.81 1.89,-2.03 2.85,-1.49 1.62,-0.4 2.16,0.4 -0.54,2.57 -1.22,1.9 0.41,4.86 -2.3,5.82 -0.27,4.46 -0.81,1.9 -3.52,2.16 -0.95,1.36 -3.24,0.13 -2.44,2.16 -5.68,0.82 -4.06,2.7 -6.08,1.35 -0.54,2.03 2.16,3.25 0.68,3.65 -3.38,-0.54 -4.06,1.08 -4.47,0.27 -2.02,-0.4 -1.09,1.89 -1.62,0.41 -1.22,1.08 -0.27,1.22 -4.06,0.67 -0.67,1.35 0.13,1.76 0.95,1.63 4.33,3.24 0,1.49 -3.25,2.57 -2.03,2.98 -0.54,1.75 -1.52,-2.02 -2.72,-0.07 -2.01,-1.03 -3.04,-0.72 -0.39,-5.77 -0.39,-0.9 -1.53,-0.78 -0.07,-2.46 -2,-0.91 -1.04,0.19 -0.07,1.88 -1.23,1.1 -0.26,1.88 -5.51,5.45 -1.49,6.35 -0.97,0 -3.63,-1.69 -1.68,-2.13 -2.4,-1.82 0,-1.3 2.59,-3.17 4.41,-2.59 0.78,-1.23 -0.78,-2.73 -1.43,-1.62 -0.71,0.13 -3.43,1.23 -0.2,0.72 1.36,1.75 0,1.1 -0.65,0.65 -5.89,-0.85 -3.44,0.07 -2.53,-0.84 -1.62,1.29 -0.13,2.01 -0.51,0.65 -2.01,0.84 0,0.84 -1.43,1.43 -2.85,-0.45 -4.8,0.97 -0.97,1.17 -0.84,3.11 0.13,3.56 0.97,1.88 -0.19,1.69 -1.3,2.26 -3.05,0.52 -2.65,2.81 -9.88,-0.87 -1.29,1.3 -0.03,0.63 -1.52,1.14 -0.19,0.92 -1.03,0.68 -1.31,-0.05 -1.77,-1.09 -2.96,-4.53 -1.1,-0.38 -0.74,0.05 -0.4,0.8 -6.34,1.83 -2.4,-0.11 -8.63,-2.69 -0.63,0.35 -0.74,-0.58 1.34,-3.37 -0.43,-2.2 -3.88,-4.11 -1.83,-0.06 -0.05,-2.28 -1.01,-1.73 -3.34,-1.9 -3.2,0.72 -2.33,-2.95 -0.78,-0.34 -0.78,0.28 -0.84,1.51 -2.24,1.44 -2.91,1.66 -2.97,0.62 -0.8,1.03 -1.26,0.23 -2.17,-1.08 -0.2,-1.11 2.23,-0.39 2.6,-2.79 -0.04,-1.98 -2.45,-2.51 -0.34,-1.17 0.51,-1.85 -0.34,-2.95 -1.45,-1.01 -2.61,0.23 -1.53,0.95 -2.05,2.45 -1.79,-0.34 -4.2,-2.36 -3.94,0.57 -3.49,-1.77 -1.54,-3.6 1.17,-2.04 1.74,-1.61 0.8,-2.63 -0.08,-0.95 -2.18,-3.13 -0.44,-1.5 1.05,-0.88 -0.46,-1.6 -1.83,0.75 -1.6,-0.12 -0.51,-2.93 -2.63,-3.35 -0.23,-2.4 -0.74,-0.34 -1.03,0.74 0.29,2.4 -0.63,0 -1.37,-2.57 -1.66,-0.29 -0.69,0.97 0.75,2.06 -0.75,1.03 -1.14,-0.52 -0.33,-1.63 0.48,-1.31 2.42,-2.6 -0.16,-4.24 0.61,-0.39 0.07,-2.74 -1.37,-0.05 -1.26,1.37 -1.62,0.75 -0.56,1.95 -0.96,0.84 -2.8,0.97 0.17,1.14 2.34,0 1.09,1.03 -0.23,3.5 -1.18,2.23 0.62,2.12 -0.28,0.9 -1,0.16 -0.73,2.34 -1.49,-0.4 -0.11,2.12 -1.09,1.37 -2.19,1.51 -2.46,-0.91 -2.05,0.86 -2.35,-0.69 -2.17,1.43 0.06,1.31 0.51,0.16 -0.33,1.28 0.33,1.53 1.29,1.43 -0.26,1.49 -1.65,1.65 2.34,2.97 -2.46,4.29 -1.03,0.4 -1.83,-0.86 -0.62,-3.54 -1.89,-1.26 -2.74,1.2 -0.8,2.69 -1.2,-0.12 -0.91,-0.91 -0.23,-3.86 -1.37,-0.74 -0.69,-0.06 -0.91,0.8 -0.61,-0.73 -3.03,-0.3 -2.85,1.83 -0.35,1.83 -1.88,0.69 -1.14,-0.15 -2,-2.57 -1.83,-1.03 -2.86,-0.28 -2.05,1.8 -2.75,-0.32 -0.8,-1.71 -2.28,-1.54 -2.11,-3.14 -0.75,-0.18 -2.4,0.06 -0.66,0.49 -0.67,2 -1.18,1.45 -0.6,-0.83 0.03,-3.68 -1.32,-1.09 0,-1.98 1.03,-2.96 -0.28,-6.37 -4.74,-7.59 -2.52,-0.58 -2.169996,0.75 -0.95,-0.2 -0.02,0.54 -3.31,0.46 -4,4.51 -2.29,0.34 -2.11,-1.03 -0.97,-2.75 -4.23,-3.19 -1.16,0.06 -1.66,-2.74 -1.37,0.46 -3.09,-2.4 -1.59,0.92 -1.09,1.48 -1.26,0.05 -2.8,-0.91 -1.55,-1.34 0.06,-3.74 2.46,-2.29 0.46,-2.97 4.34,-0.29 2.17,-1.6 2.69,-0.57 1.65,-1.14 2.69,-4 2.4,-0.86 1.88,-2.05 2.17,0.05 1.19,-2.28 -0.33,-2.1 0.45,-2.42 1.21,-1.05 3.03,-1.31 1.39,-1.71 0.38,-1.32 3.08,-2.18 0.949996,-2.42 1.45,-1.46 3.09,-1.03 2.51,0.4 0.54,-1.59 0.72,-0.12 3.2,1.43 1.65,-0.4 1.46,-2.42 0.11,-1.95 -1.23,-3.57 1.49,-4.74 6.23,2.34 2.11,-0.06 2,-0.74 0.75,-1.54 4.05,-2.89 2,-0.63 0.74,-1.6 4.29,-3.02 2.85,-0.23 2.59,-1.63 0.76,-0.88 0.51,-3.12 2.21,-1.07 4.82,0.29 1.48,0.3 2.86,1.77 4.13,0.29 2.36,-1.57 3.74,-0.1 3.05,-1.38 1.48,0.1 4.63,1.87 2.85,2.86 10.93,2.46 6.79,3.54 2.66,0.79 3.54,2.65 3.74,0.1 0.89,1.09 3.25,-1.19 1.18,-1.77 0.39,-1.67 -0.39,-3.54 0.39,-1.87 2.17,-3.45 -0.1,-1.57 1.08,-0.89 z' }, // Прямоугольник 3
    { id: 5, data: { name: "Нарын" }, d: 'm 449.93619,79.788751 0.57,1.03 1.25,0.11 1.47,0.91 3.98,-1.7 1.2,-1.42 0,0 1.74,1.88 4.42,1.47 1.4,1.63 1.78,-0.24 0.16,2.18 1.7,0.31 0.23,1.24 6.05,-0.78 0.85,-2.79 0.78,-0.31 5.12,0.62 0.69,0.7 -0.93,5.27 0.7,0.39 -0.31,1.7 0.39,2.72 1.71,4.42 -0.24,2.089999 3.96,2.56 0,2.71 4.26,1.63 0.39,0.62 0,1.32 -1.55,3.18 -0.31,1.78 -0.7,0.93 -1.4,0.08 -2.01,3.49 0.08,0.85 3.02,0.77 3.26,-1.31 2.48,0.07 1.31,-1.47 1.86,0 2.08,0.51 4.58,2.24 1.16,-0.46 4.42,0.62 0.54,1.24 1.4,0.85 2.71,0.39 1.32,-0.85 0.7,0.15 1.01,0.93 3.02,1.01 1.24,1.47 3.57,1.01 0.62,1.4 0.93,0.31 1.47,-1.09 0.46,0.31 0.47,1.86 -0.39,1.09 -1.94,1.24 -0.07,2.17 -0.55,1.08 -1.08,0.62 -4.89,0.16 -1.78,-0.47 -0.77,0.47 -1.4,2.95 0.62,2.86 -0.47,1.56 0.31,1.55 1.4,-0.55 5.74,0.86 5.19,-0.55 0.86,-1.31 1.55,-0.94 1.78,0.62 1.08,1.01 0.7,1.32 0.24,2.33 -0.63,1.08 -1.78,1.17 -0.7,1.62 0.24,0.86 2.4,1.39 0.31,0.85 -1.63,4.85 -0.08,1.78 1.4,0.24 1.63,-1.55 0.7,0.15 2.32,3.1 6.05,0.08 7.05,-1.16 1.01,0.31 1.32,1.47 1.86,0.46 3.8,-2.55 9.82,1.24 4.72,-0.93 2.18,-1.63 1.31,-2.48 0.62,0 1.4,4.26 -1.94,5.58 -0.54,1.09 -4.03,-0.16 1.24,0.39 1.08,1.71 2.17,8.14 2.64,1.39 1.24,0.31 1.71,-0.46 1.24,0.54 1,1.78 -1.39,3.03 -0.08,2.56 -0.7,1.39 -1.7,1.79 -2.1,1.24 0.16,1.55 0.7,0.31 7.44,-3.57 10.08,-2.02 1.32,1.09 2.32,0.78 -1.24,1.47 0,3.33 2.64,2.41 4.65,-0.55 0.85,-0.54 4.89,0.7 2.48,-0.31 5.43,2.25 2.48,0.46 3.33,-2.25 3.57,-1.32 0.7,-0.85 4.34,-0.62 0.46,0.62 1.24,0.08 -0.93,2.56 0.47,2.17 0.85,1.32 1.94,1.55 1.85,0.44 0,0 -0.84,3.42 -0.91,0.27 -2.36,2.53 -4.84,0.63 -3.2,3.02 -0.97,0 -2.52,-2.22 -3.14,-0.4 -2.71,0.34 -1.4,-0.34 -1.66,-1.26 -1.31,0 -0.35,0.97 -2.28,0.74 0.1,0.51 -3.47,1.21 -1.38,1.88 -2.7,-0.47 -1.69,0.81 -0.97,1.15 -4.12,-0.23 -4.68,1.37 -1.6,-0.69 -4.43,0.52 -1.37,-0.4 0.13,-1.32 -3.68,-0.4 -0.8,-1.08 -2.79,-0.46 -6.17,3.14 -3.6,-2.11 -2,0.06 -2.52,1.25 -1.2,-0.34 -1.14,-0.8 -1.77,-0.28 -0.74,-2.17 -2.57,-1.26 -3.83,0.11 -0.57,-0.63 -1.37,0.06 -2.86,3.03 -1.84,1.13 -1.73,-0.29 0.26,0.7 -2.34,-0.28 -0.98,1.48 -0.17,2.89 -2.4,0.05 -0.45,1.37 -2.8,0.98 -1.32,4.34 0.35,5.25 -1.83,0.97 0.3,1.68 -1.04,1.18 -0.35,1.6 -4.57,3.26 0.12,2.68 1.77,2.57 -2.17,4.8 0.32,1.89 -1.07,1.71 -1.71,0.63 -1.14,2.4 -1.6,0.74 -1.49,2.23 -1.54,3.71 0.23,3.2 -0.91,1.54 -1.89,1.43 -0.11,1.03 -3.72,2.17 -0.63,1.83 -2.74,1.2 -3.03,0 -1.59,3.2 -1.32,-1.09 -0.17,-3.6 -1.94,-1.31 -3.03,-0.52 -1.43,0.17 -2.02,2.29 -3.09,2.17 -6.56,-1.26 -2.92,2.29 -0.74,-0.34 -1.2,-1.89 -1.89,-0.46 -0.91,0.58 -1.14,2.74 -1.2,1.43 0.11,2.57 -0.84,0.77 -1.56,-1.17 -3.77,0.05 -0.68,-1.08 -0.4,0.4 -0.8,-0.86 -2.86,2 -2.85,0.11 -2.18,1.63 -0.8,-0.2 -0.85,-5.14 -1.15,-2 0,-0.97 0.97,-2.74 -0.28,-1.09 2.34,-2.68 0.74,-2.63 -3.06,-2.8 -1.79,-0.75 -0.88,-1.59 -0.86,-3.37 -0.34,-6.63 -0.74,-1.77 -2.29,-1.14 -2.91,1.26 -4.17,2.97 -4.57,5.31 -2.05,1.1 -2.24,0.38 -1.6,1.15 -2.62,2.51 -0.4,1.71 -1.97,0.43 -1.48,1.89 -2.4,1.54 -4,-1.03 -2.06,0 -3.54,1.32 -2.17,-0.23 -1.89,-1.37 -2.45,0.51 -1.66,-0.4 -5,-4.57 -2.8,-1.26 1.14,0.52 -2.46,-0.63 -1.1,0.96 -2.39,-1.02 -1.1,0 -1.36,0.97 -6.03,-0.52 -1.1,-1.55 -1.95,-0.13 -0.77,-0.58 -1.24,0.32 -1.16,-1.23 -0.85,0.45 -0.51,-0.26 -0.46,-2.07 1.36,-3.24 -0.52,-1.04 -1.1,-1.04 -1.29,-0.13 -1.75,-1.29 -2.66,-0.65 -1.94,0.32 -2.21,-2.65 -2.07,-0.07 -1.56,-1.88 -2.27,-0.77 -2.91,-5.84 -1.62,0.33 -0.78,-0.46 -1.23,-3.5 -0.45,-0.45 -1.49,0 -1.43,-1.04 -0.39,-3.11 -2.07,-2.46 -1.82,-0.65 -2.01,-2.33 -1.94,-0.26 -1.17,-3.57 -3.04,-1.49 -0.3,-0.63 1.35,-3.11 2.3,-2.7 2.17,-1.49 0,-1.49 -4.33,-3.24 -0.95,-1.63 -0.13,-1.76 0.67,-1.35 4.06,-0.67 0.27,-1.22 1.22,-1.08 1.62,-0.41 1.08,-1.89 2.03,0.4 4.47,-0.27 4.05,-1.08 3.39,0.54 -0.68,-3.65 -2.17,-3.25 0.55,-2.03 6.08,-1.35 4.06,-2.7 5.68,-0.82 2.44,-2.16 3.24,-0.13 0.95,-1.36 3.52,-2.16 0.81,-1.9 0.27,-4.46 2.3,-5.82 -0.41,-4.86 1.22,-1.9 0.54,-2.57 -2.16,-0.4 -1.63,0.4 -2.84,1.49 -1.89,2.03 -2.57,0.81 -5.95,0.27 -3.65,0.95 -2.71,3.38 -1.49,0 -1.76,-1.49 -3.92,-1.08 -6.9,0.67 -2.03,1.36 -2.84,-1.76 -2.16,-0.41 -3.65,0.54 -2.57,-0.4 -3.25,-2.17 -1.35,-1.35 -0.41,-1.35 -2.1,-0.88 -2.66,-6.08 0.08,-0.84 1.9,-0.61 2.13,1.45 3.87,0.83 2.36,1.98 0.53,1.06 -0.83,1.75 0,1.45 1.52,2.05 1.14,-0.08 0.91,-2.28 -0.38,-5.01 -0.61,-1.45 0.53,-3.95 -0.98,-0.69 -4.03,0 -1.6,-1.06 -1.83,-3.88 0.31,-3.12 -0.46,-1.52 -1.21,-0.91 -2.89,0 -0.92,-0.46 -2.66,0.61 -2.36,-2.2 -0.6,-0.08 -1.22,1.06 -1.14,-0.07 -3.19,-1.45 -0.76,-1.06 3.95,-4.11 1.05,-2.14 2.95,-0.68 0.79,0.68 5.11,0 1.82,-0.8 1.14,0.23 1.7,-1.7 1.14,1.81 2.73,2.5 0.68,1.59 1.47,0.34 3.87,-0.68 0.45,0.57 -1.7,4.89 1.47,1.7 1.25,-0.91 1.82,-5.45 1.14,-1.02 1.36,-0.57 2.39,0.68 1.93,-0.34 0.95,-5.51 2.73,-1.37 0.68,-1.7 -0.91,-3.41 0.57,-1.13 1.36,-1.14 1.48,-0.34 0.91,-1.48 0.91,-0.34 -0.34,-1.02 -3.3,-1.48 -1.13,-1.02 1.93,-8.98 3.07,0.57 2.72,-0.23 2.73,-0.9 2.39,0.56 3.18,-0.789999 2.38,0.11 4.96,-1.76 2.84,0.45 2.72,-2.15 2.39,-3.07 1.7,-0.8 3.75,-0.45 1.82,0.45 1.02,-0.79 -0.45,-2.62 -1.36,-1.81 -0.8,-2.16 -2.27,-2.61 -0.34,-1.6 7.61,-0.68 1.14,-0.57 5.11,0.8 2.27,-1.25 1.14,0.34 1.13,1.71 2.84,-0.12 3.07,-2.16 0.91,1.03 1.36,0.45 3.18,-0.8 5,1.82 2.73,-1.13 3.18,-0.12 1.14,-1.47 2.61,1.81 1.59,-0.56 1.93,0.34 1.93,-0.57 1.25,-0.57 0.46,-0.8 1.02,0.23 z' }, // Прямоугольник 3
    { id: 6, data: { name: "Ош" }, d: 'm 399.28619,264.00875 -0.04,0.56 -0.52,0.02 0,3.72 -1.83,1.82 0.12,0.69 4.53,4.05 1.46,2.51 2.28,1.58 -0.19,1.37 -0.97,0.09 -1.83,1.2 -1.28,-0.18 -2.17,-1.96 -0.77,-0.15 -7.05,0.15 -0.62,0.39 0.21,2.68 -2.63,3.86 -1.14,0.36 -0.75,-0.94 -1.94,-0.27 -1.88,0.4 -3.89,6.05 -3.43,1.97 -2.28,3.32 -4.29,3.25 -1.39,1.68 -2.14,0.89 -1.02,0 -2,-1.48 -1.38,0.64 -1.94,-2.3 -8.57,2.06 -1.25,0.63 -0.06,0.57 -1.37,1.08 -1.54,0.46 -2.4,-1.54 -0.63,0.17 -2.73,4.71 -3.9,1.29 -0.05,1.03 2.5,1.08 0.24,1.6 -3.83,4.69 -0.74,1.85 0.8,4.26 -1.72,1.54 -0.91,-0.11 -2,1.54 -1.31,5.48 0.45,2.63 3.26,1.03 1.3,1.34 2.13,5.86 0.91,4.11 -0.23,3.31 -2.05,0 -0.46,0.57 -0.57,2.66 -1.54,1.2 0.51,1.31 -0.74,1.66 -0.06,3.03 -1.54,0.8 -8.46,1.26 -3.14,-0.18 -3.71,-1.08 -1.72,0.97 -2.67,-0.17 -1.43,0.91 -2.23,-1.31 -4.57,0.11 -2.51,1.55 -2.86,0.39 -2.34,1.26 -0.57,0.86 0.11,2.23 -1.37,1.88 -5.08,-0.28 -1.14,1.48 -4.12,1.49 -2.11,-0.12 -3.19,-1.43 -1.6,0.06 -3.94,1.54 -2.97,-0.68 -3.26,1.14 -1.94,-1.48 -1.2,0.05 -2.51,1.66 -2.69,-1.2 -3.25,1.26 -2.63,-2.12 -3.94,-1.43 -5.6,-0.8 -1.31,1.32 -0.63,1.66 -1.14,0.74 -1.32,0.06 -1.14,-2.29 -2.92,-0.17 -1.77,0.97 0.12,1.94 -0.4,0.35 -3.94,0 -2.69,1.25 -2.85,0.23 -0.98,0.86 -0.99,1.25 -1.43,4.06 -3.75,7.03 -0.99,0.17 -0.68,-0.57 -0.86,-3.94 -0.69,-0.75 -1.2,-0.11 -0.8,-2.23 -4.05,-0.29 -1.32,-0.57 -0.91,-1.08 -1.37,-6.34 -0.69,-0.69 -1.71,0.12 -2.51,1.48 -1.2,0 -3.72,2.8 -1.42,2.04 -5.49,0.64 -0.8,0.69 -1.49,-0.4 -1.63,-1.75 -1.68,-3.51 0.52,-1.59 2.34,-2.18 1.03,-2.17 -1.99,-5.26 -1.21,-0.65 -7.49,1.72 -3.54,-0.86 -0.8,0.91 -2.34,-0.63 -1.77,-4.17 -0.12,-1.48 1.78,-3.03 0.09,-2.51 -0.62,-1.28 -3.51,-2.22 0,0 0.97,-1.34 0.38,-2.89 2.7,-4.75 0.84,-0.56 5.68,-0.56 1.21,-0.74 1.68,-3.26 4,0.55 0.47,1.59 1.12,0.84 1.67,0.74 3.36,0.47 2.32,1.95 3.17,-0.46 2.7,0.37 3.54,2.79 3.82,0.1 1.59,1.68 3.63,-1.68 1.68,-0.19 3.26,0.28 2.14,1.21 3.17,-0.93 0.93,-0.74 3.44,-0.84 2.33,-2.8 2.42,-0.28 0.75,-0.93 5.4,-1.77 2.42,-1.58 0.28,-1.96 0.93,-0.65 -0.65,-2.52 -2.23,-2.7 -1.49,-1.02 1.02,-1.12 -1.02,-0.84 -0.28,-0.93 -1.59,-0.65 -0.83,0.28 -1.12,1.4 -1.31,0 -1.58,-2.05 -1.96,-4.94 -2.6,-1.68 -3.92,-0.74 -0.09,-1.31 1.58,-4 -0.09,-1.21 -1.3,-1.87 0.84,-2.79 -0.38,-1.03 -0.93,-0.65 -3.07,-1.02 2.98,-2.61 0,-1.3 -0.47,-1.31 -1.12,-1.02 -4.28,-1.68 -0.65,-0.75 2.7,-1.95 0,-0.75 -1.49,-1.86 1.02,-4.19 -0.37,-1.12 -0.93,-0.74 -1.4,0 -6.43,1.77 -3.41,1.63 0,0 -3.44,-2.13 -0.63,-0.69 0.17,-0.45 2.88,-3.39 1.29,-0.27 1.94,-2.57 -0.4,-1.37 1.77,-1.94 0.35,-2.35 3.25,0.12 0.12,-0.92 2.58,-1.6 0.47,-0.76 -0.36,-0.89 1.03,-0.29 1.37,0.86 2.8,0 0.23,2.68 1.94,1.89 1.09,0.51 0.68,-0.57 1.32,0.06 2.23,1.71 1.02,1.49 0.97,0.28 0.35,0.8 2.11,-0.57 -0.51,-2.45 0.23,-1.15 1.71,-2.01 0.06,-3.81 -0.37,-1.12 -2.15,-0.37 0.29,-1.54 0.74,-0.74 -1.71,-3.83 -2.29,-1.31 0.52,-0.98 2.05,0.06 0.46,-1.6 1.03,0.34 2.54,3.2 0.57,2.29 1.54,1.31 0.97,-0.34 0.11,-1.66 0.92,-0.4 1.03,1.89 5.02,1.83 2.12,1.65 1.71,0.23 1.89,-0.63 0.74,-2.57 0.06,-4.28 0.97,-0.06 0.74,0.97 2.74,0.07 1.2,-0.98 -0.11,-1.32 1.43,-4.68 -1.55,-1.6 0.12,-0.74 1.03,-0.63 1.08,1.26 0.97,-0.12 3.43,-1.31 1.31,-3.03 4.79,-1.26 0.53,-0.91 2,-1.2 3.03,-1.03 5.66,-0.8 1.77,-0.57 1.26,-1.14 1.6,-3.03 -0.78,-2.26 2.65,-2.81 3.05,-0.52 1.3,-2.26 0.19,-1.69 -0.97,-1.88 -0.13,-3.56 0.84,-3.11 0.97,-1.17 4.8,-0.97 2.85,0.45 1.43,-1.43 0,-0.84 2.01,-0.84 0.51,-0.65 0.13,-2.01 1.62,-1.29 2.53,0.84 3.44,-0.07 5.89,0.85 0.65,-0.65 0,-1.1 -1.36,-1.75 0.2,-0.72 4.14,-1.36 1.95,2.4 0.26,1.95 -0.78,1.23 -4.41,2.59 -2.59,3.17 0,1.3 2.4,1.82 1.68,2.13 3.63,1.69 0.97,0 0.46,-0.58 0.45,-4.54 1.23,-2.27 4.86,-4.41 0.26,-1.88 1.23,-1.1 0.07,-1.88 2.33,0.13 0.72,0.59 0.06,2.46 1.53,0.78 0.39,0.9 0.39,5.77 3.04,0.72 2.01,1.03 2.72,0.07 1.82,2.65 3.04,1.49 1.17,3.57 1.95,0.26 2,2.33 1.82,0.65 2.07,2.46 0.39,3.11 1.43,1.04 1.49,0 0.45,0.45 1.23,3.5 0.78,0.46 1.62,-0.33 2.92,5.84 2.27,0.77 1.55,1.88 2.08,0.07 2.2,2.65 1.94,-0.32 5.71,2.07 1.62,2.08 -1.36,3.24 0.45,2.07 0.52,0.26 0.84,-0.45 1.17,1.23 1.23,-0.32 0.78,0.58 1.94,0.13 1.1,1.55 6.03,0.52 1.36,-0.97 1.1,0 z' }, // Прямоугольник 3
    { id: 7, data: { name: "Талас" }, d: 'm 193.28619,44.648751 1.45,0.63 1.66,1.66 5.08,1.14 1.77,2.17 1.77,0.75 3.72,0.28 2.45,-1.66 4.8,-0.28 7.89,2.37 6.57,3.54 2.05,1.89 1.76,0.8 0.86,-0.69 6.17,-0.34 6.34,3.14 1.88,0.17 2.23,1.2 4.63,6.63 3.77,0.63 1.2,0.45 0.51,0.8 1.77,0.52 3.83,0.45 2.59,-0.76 1.98,0.59 6.29,-0.74 5.14,2 6.8,0.74 0.85,1.54 0.49,4.97 2.75,1.32 8.31,1.43 0.92,-0.06 1.91,-1.24 1.08,0.55 0.79,-0.3 0.59,-1.67 0.59,-3.84 1.38,-0.3 1.08,1.09 0.69,1.87 1.08,0.19 1.28,-1.08 1.08,0.39 1.18,1.19 0,1.87 -0.68,2.06 -2.76,3.35 -0.2,3.15 -1.18,1.38 -7.38,2.56 -4.43,-1.48 -4.14,0.3 -2.65,2.36 -4.14,-1.08 -3.54,1.28 -1.48,-0.6 -1.08,0.2 -4.43,3.84 -4.33,-1.38 -0.79,0.69 -0.29,5.119999 1.37,1.87 3.25,1.18 -0.49,2.76 0.49,1.67 -2.46,1.08 -1.57,-0.59 -1.38,0.3 -0.79,-1.48 -1.97,1.28 -1.57,-1.57 -0.69,0.19 -2.17,2.96 -2.75,1.28 -0.89,2.95 -3.64,0.59 -1.38,0 -6.26,-4.82 -5.02,-2.46 -4.73,0.39 -4.23,-2.26 -1.77,0.19 -2.95,-2.26 -3.45,0.98 -1.38,-0.39 -1.87,-2.86 -3.15,-1.47 -2.75,0.1 -4.14,-0.79 -1.08,0.89 0.1,1.57 -2.17,3.45 -0.39,1.87 0.39,3.54 -0.39,1.67 -1.18,1.77 -3.25,1.19 -0.89,-1.09 -3.74,-0.1 -3.54,-2.65 -2.66,-0.79 -6.79,-3.54 -10.93,-2.46 -2.85,-2.86 -4.63,-1.87 -1.47,-0.1 -3.06,1.38 -3.74,0.1 -2.36,1.57 -2.26,0 -1.87,-0.29 -2.86,-1.77 -1.48,-0.3 -4.82,-0.29 -2.2,1.07 -1.81,-2.37 -1.77,-0.29 -2,-1.309999 -1.77,-2 -3.43,-2.06 -4.91,-0.51 -1.03,0.34 -1.89,2.46 -1.77,0.8 -1.37,-0.23 -1.83,-1.2 -1.83,0.91 -1.08,-0.05 -0.57,-2.17 -1.26,-0.92 -0.51,-1.88 1.88,-4.86 1.94,-0.4 0.07,-0.96 1.31,-0.58 1.51,-1.62 -0.37,-1.01 -1.43,-0.85 -0.04,-1.04 2.67,-1.76 1.03,-4.23 1.6,-0.23 3.77,2.11 1.6,-0.17 0.17,-1.88 -0.46,-0.86 -2.06,-2.97 -2.57,-2.46 -0.45,-1.08 0.4,-1.49 1.14,-1.37 1.37,-0.34 5.37,0.97 4,-1.14 0.11,-7.23 2.63,-0.6 2.06,-1.83 1.65,-2.85 0.29,-2.92 1.2,-0.34 2.91,0.74 2.12,-0.4 2.97,-2.91 2.91,-0.06 1.09,0.57 1.77,0.06 4.28,-1.43 2.55,1.96 2.71,0.9 1.06,-1.54 2.17,-0.92 0.74,-1.31 4.06,0.4 7.2,-2.63 5.77,0.97 z' }, // Прямоугольник 3
    { id: 2, data: { name: "Иссык-Куль" }, d: 'm 644.30619,204.38875 -1.85,-0.44 -1.94,-1.55 -0.85,-1.32 -0.47,-2.17 0.93,-2.56 -1.24,-0.08 -0.46,-0.62 -4.34,0.62 -0.7,0.85 -3.57,1.32 -3.33,2.25 -2.48,-0.46 -5.43,-2.25 -2.48,0.31 -4.89,-0.7 -0.85,0.54 -4.65,0.55 -2.64,-2.41 0,-3.33 1.24,-1.47 -2.32,-0.78 -1.32,-1.09 -10.08,2.02 -7.44,3.57 -0.7,-0.31 -0.16,-1.55 2.1,-1.24 1.7,-1.79 0.7,-1.39 0.08,-2.56 1.39,-3.03 -1,-1.78 -1.24,-0.54 -1.71,0.46 -1.24,-0.31 -2.64,-1.39 -2.17,-8.14 -1.08,-1.71 -1.24,-0.39 4.03,0.16 0.54,-1.09 1.94,-5.58 -1.4,-4.26 -0.62,0 -1.31,2.48 -2.18,1.63 -4.72,0.93 -9.82,-1.24 -3.8,2.55 -1.86,-0.46 -1.32,-1.47 -1.01,-0.31 -7.05,1.16 -6.05,-0.08 -2.32,-3.1 -0.7,-0.15 -1.63,1.55 -1.4,-0.24 0.08,-1.78 1.63,-4.85 -0.31,-0.85 -2.4,-1.39 -0.24,-0.86 0.7,-1.62 1.78,-1.17 0.63,-1.08 -0.24,-2.33 -0.7,-1.32 -1.08,-1.01 -1.78,-0.62 -1.55,0.94 -0.86,1.31 -5.19,0.55 -5.74,-0.86 -1.4,0.55 -0.31,-1.55 0.47,-1.56 -0.62,-2.86 1.4,-2.95 0.77,-0.47 1.78,0.47 4.89,-0.16 1.08,-0.62 0.55,-1.08 0.07,-2.17 1.94,-1.24 0.39,-1.09 -0.47,-1.86 -0.46,-0.31 -1.47,1.09 -0.93,-0.31 -0.62,-1.4 -3.57,-1.01 -1.24,-1.47 -3.02,-1.01 -1.01,-0.93 -0.7,-0.15 -1.32,0.85 -2.71,-0.39 -1.4,-0.85 -0.54,-1.24 -4.42,-0.62 -1.16,0.46 -4.58,-2.24 -2.08,-0.51 -1.86,0 -1.31,1.47 -2.48,-0.07 -3.26,1.31 -3.02,-0.77 -0.08,-0.85 2.01,-3.49 1.4,-0.08 0.7,-0.93 0.31,-1.78 1.55,-3.18 0,-1.32 -0.39,-0.62 -4.26,-1.63 0,-2.71 -3.96,-2.56 0.24,-2.089999 -1.71,-4.42 -0.39,-2.72 0.31,-1.7 -0.7,-0.39 0.93,-5.27 -0.69,-0.7 -5.12,-0.62 -0.78,0.31 -0.85,2.79 -6.05,0.78 -0.23,-1.24 -1.7,-0.31 -0.16,-2.18 -1.78,0.24 -1.4,-1.63 -4.42,-1.47 -1.74,-1.88 0,0 3.68,-2.67 1.48,-3.41 0.91,-0.8 1.48,0 1.36,-1.13 3.52,-0.12 0.12,-2.04 -0.57,-2.28 0.57,-1.25 2.27,0.35 2.5,1.13 2.61,-0.57 3.86,0.12 0.8,-0.91 4.54,-0.8 1.14,-0.91 1.93,-0.45 3.3,0 1.59,0.68 1.47,-0.45 1.03,-0.68 0.34,-2.62 2.5,-1.13 1.81,-2.05 6.59,-4.2 1.94,-2.05 2.5,0.34 1.59,-0.79 2.72,-0.34 0.12,-2.28 1.93,0.12 1.02,0.91 2.04,-0.46 3.53,0.57 1.81,-0.79 2.39,0.34 2.61,-1.14 4.89,0.68 1.7,-0.23 4.55,-2.04 2.95,0.34 0.68,-0.8 1.48,-0.45 10.57,-1.36 2.72,0.45 1.14,-0.57 1.48,-4.77 3.18,-2.84 2.73,-0.68 0.85,-1.31 0.85,0.71 4.97,0 3.95,0.62 2.22,-1.25 5.72,-1.37 2.05,0.45 2.97,-0.62 1.89,0.51 0.97,1.03 5.66,0.23 6.05,1.08 2.91,-0.51 4.52,2.68 1.86,-0.17 2.74,1.14 1.14,-0.05 1.68,2.11 1.01,0.23 3.31,-1.32 3.62,1.38 1.32,0.17 2.57,-0.63 2,0.4 2.38,-0.92 0.39,-1.2 4.07,0.18 6.79,1.8 1.66,-0.86 1.25,-2 0.74,-0.17 1.9,1 6.23,-1.89 3.31,2.92 1.76,0.25 1.09,1.37 1.77,-0.11 1.95,1.06 1.66,2.34 2.9,-0.14 0.86,-0.52 1.84,0.77 1.94,-0.11 1.48,1.6 2.91,-0.6 6.96,2.68 6.44,0.23 2.4,1.2 4,-1.83 5.48,-1.65 1.09,0.11 0.03,1.23 -1.48,2.86 0.76,4.02 1.52,3.09 3.47,4.44 2.64,1.27 1.2,1.89 2.82,0.22 0.63,0.52 0.12,1.2 4.65,4.63 1.14,2.22 1.88,1.89 2,1.03 1.19,2.23 8.24,0.51 2.74,-2.17 13.87,3.71 4.86,-0.17 1.88,0.46 0.77,0.74 0.8,3.94 2.23,2.06 0.94,1.88 4.06,0.86 1.17,2.11 2.57,1.37 0.19,1.65 -0.65,1.33 2.8,4.049999 0.4,1.54 0.86,0.35 1.23,-1.37 0.86,-0.12 2.28,0.63 1.74,1.48 0.8,6 -0.97,4.34 2.28,3.2 -0.31,0.98 -2.15,0 -1.9,-0.75 -1.09,0.35 -0.82,1 -3.61,1.02 -8.68,-1.02 -3.09,0.4 -4.46,-0.23 -3.88,0.97 -2.06,1.31 -0.33,3.66 -1.34,1.26 -1.78,5.27 -1.29,1.24 -0.97,2.57 -1.66,1.48 -0.8,2.4 -3.42,3.43 -4.92,1.2 -6.63,-0.53 -2.36,0.47 -1.29,-1.21 1.38,-0.44 -0.41,-0.6 0.92,-0.41 -0.24,-0.64 0.78,-0.89 -1.24,-1.76 -3.59,-0.39 -2.97,1.49 -2.28,2.85 -1.6,0.23 -1.31,-0.63 -1.04,0.52 -4.17,4.22 -0.16,0.75 -1.04,0.4 -0.34,0.85 -1.31,0.86 -2.93,-0.28 -2.84,0.62 -2.57,2.52 -4.57,1.6 -0.75,1.71 -4.17,0.51 -2.17,1.2 -1.82,2.06 0.05,0.48 -0.85,0.21 -1.15,1.42 -1.65,0.58 -1.37,1.71 -1.15,0 0.06,0.4 -1.69,0.86 -2.65,-0.06 -0.23,0.51 -2.86,0.29 -1.42,0.8 -0.92,3.43 -1.37,0.62 -1.6,2.8 -3.6,0.35 -2.57,-0.75 -0.91,0.52 -1.2,2.4 -2,1.37 -4,1.77 -3.94,0.51 -0.63,1.55 -0.06,2.91 1.37,1.6 0.29,3.94 -1.49,0.91 -0.4,2.46 -3.02,0.34 -3.66,3.95 -1.49,0.8 z' }, // Прямоугольник 2
  ];

  const getCities = async (id) => {
    console.log("id",id);
    try {
      const result = await fetchData(id)
      console.log("cities podrobno=", result)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        xmlnsMapsvg="http://mapsvg.com"
        xmlnsDc="http://purl.org/dc/elements/1.1/"
        xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlnsSvg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        mapsvgGeoViewBox="69.259411 43.256543 80.288715 39.169714"
        width="100%" 
        height="auto"
        viewBox="0 0 820 500"
        // viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet"
      // viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"
      >
        {paths.map((path, index) => (
          <path
            key={path.id}
            d={path.d}
            // d={path?.find(i => i.id ===)}
            style={{
              stroke: 'var(--main)',
              fill: clickedIndex === index
                ? '#A9A9A9'
                : hoveredIndex === index
                  ? '#D3D3D3'
                  : 'white',
              strokeWidth: 2,
              transition: 'all 0.5s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              getCities(path?.index)
              setClickedIndex(index);
              setData(path.data);
              console.log(path);
            }}
          />
        ))}
      </svg>

    </Box>
  );
};

export default MapTest;
