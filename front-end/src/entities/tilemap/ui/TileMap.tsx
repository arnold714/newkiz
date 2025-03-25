import React, { JSX } from "react"
import { useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { TileMapProps } from "../model/types"

export const TileMap: React.FC<TileMapProps> = ({ tilesetPath, tileSize, mapWidth, mapHeight, tileData, scale, wScale, hScale, color }) => {
  const texture = useLoader(THREE.TextureLoader, tilesetPath)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter

  // 타일셋 정보 계산
  const tilesetWidth = texture.image.width
  const tilesetHeight = texture.image.height
  const tilesPerRow = Math.floor(tilesetWidth / tileSize)

  const tiles: JSX.Element[] = []

  // hScale의 값이 없으면 1
  const yPos = hScale ?? 1

  // 타일맵 생성
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const tileIndex = tileData[y * mapWidth + x]
      if (tileIndex === -1) continue // 빈 타일은 건너뛰기

      // 타일셋에서 타일 위치 계산
      const tileX = tileIndex % tilesPerRow
      const tileY = Math.floor(tileIndex / tilesPerRow)

      // UV 좌표 계산
      const u = (tileX * tileSize) / tilesetWidth
      const v = 1 - ((tileY + 1) * tileSize) / tilesetHeight
      const uSize = tileSize / tilesetWidth
      const vSize = tileSize / tilesetHeight

      // 타일 생성
      const tileTexture = texture.clone()
      tileTexture.repeat.set(uSize, vSize)
      tileTexture.offset.set(u, v)

      tiles.push(
        <mesh key={`${x}-${y}`} position={[(x - mapWidth / 2 + 0.5) * wScale, (mapHeight / 2 - y - 0.5) * yPos, 0]}>
          <planeGeometry args={[scale, scale]} />
          <meshBasicMaterial map={tileTexture} transparent={true} color={color || 0xffffff} />
        </mesh>
      )
    }
  }

  return <>{tiles}</>
}
