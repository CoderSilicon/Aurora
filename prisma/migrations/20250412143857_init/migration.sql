-- CreateTable
CREATE TABLE "MindMap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{"nodes": [], "edges": []}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MindMap_pkey" PRIMARY KEY ("id")
);
