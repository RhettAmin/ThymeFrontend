'use client'

import { useState, useRef, useImperativeHandle } from "react"
import { motion, useMotionValue, useTransform, useVelocity, animate } from "motion/react"
import { Recipe } from "@/app/models/recipe"
import { RecipeCard } from "./recipeCard"

export const PER_SIDE = 2
export const PAGE_SIZE = PER_SIDE * 2
export type BookHandle = { flip: (dir: 1 | -1) => void }

type Props = {
    recipes: Recipe[]
    currentIndex: number
    onCommit: (newIndex: number) => void
    ref?: React.Ref<BookHandle>
}
const spreadAt = (recipes: Recipe[], index: number) => {
    const start = index * PAGE_SIZE
    return {
        left:  recipes.slice(start, start + PER_SIDE),
        right: recipes.slice(start + PER_SIDE, start + PAGE_SIZE),
    }
}

const RecipeBookDisplay = ({ recipes, currentIndex, onCommit, ref }: Props) => {

    const [flipDir, setFlipDir] = useState<1 | -1 | null>(null)
    useImperativeHandle(ref, () => ({ flip: startFlip }))

    const totalPages = Math.max(1, Math.ceil(recipes.length / PAGE_SIZE))
    const current = spreadAt(recipes, currentIndex)
    const next    = spreadAt(recipes, currentIndex + 1)
    const prev    = spreadAt(recipes, currentIndex - 1)

    // which four halves are on screen depends on flip direction
    const staticLeft  = flipDir === -1 ? prev.left  : current.left
    const staticRight = flipDir === 1  ? next.right : current.right
    const sheetFront  = flipDir === -1 ? prev.right : current.right
    const sheetBack   = flipDir === -1 ? current.left : next.left

    const rotateX     = useMotionValue(0)      // the slight up/down tilt
    const rotateY     = useMotionValue(0)

    // front is lit at 0°, edge-on and dark by -90°
    const frontShade = useTransform(rotateY, [0, -90], [0, 0.6])
    // back is dark at -90°, flat and lit by -180°
    const backShade  = useTransform(rotateY, [-90, -180], [0.6, 0])
    // a specular band that peaks as the sheet passes edge-on
    const sheen      = useTransform(rotateY, [0, -90, -180], [0, 0.35, 0])

    const containerRef = useRef<HTMLDivElement>(null)
    const dragRef = useRef<{ dir: 1 | -1; startX: number; startY: number; startRot: number } | null>(null)
    const rotVelocity = useVelocity(rotateY)   // for flick detection

    // a slight bend that swells mid-turn and settles flat
    const bow = useTransform(rotateY, [0, -90, -180], [0, 4, 0])
    const gather = useTransform(rotateY, [0, -90, -180], [1, 0.92, 1])

    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

    const canFlip = (dir: 1 | -1) => {
        const t = currentIndex + dir
        return Number.isFinite(t) && t >= 0 && t <= totalPages - 1
    }

    const onPointerDown = (dir: 1 | -1) => (e: React.PointerEvent) => {
        if (flipDir || !canFlip(dir)) return
        if ((e.target as HTMLElement).closest('a')) return   // let card links work

        const startRot = dir === 1 ? 0 : -180
        setFlipDir(dir)
        rotateY.set(startRot)
        rotateX.set(0)
        dragRef.current = { dir, startX: e.clientX, startY: e.clientY, startRot }
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: React.PointerEvent) => {
        const d = dragRef.current
        if (!d || !containerRef.current) return

        const pageWidth = containerRef.current.offsetWidth / 2
        const dx = e.clientX - d.startX
        const dy = e.clientY - d.startY

        // dragging one full page-width across === a complete 180° turn
        rotateY.set(clamp(d.startRot + (dx / pageWidth) * 180, -180, 0))
        rotateX.set(clamp((-dy / pageWidth) * 30, -10, 10))
    }

    const onPointerUp = (e: React.PointerEvent) => {
        const d = dragRef.current
        if (!d) return
        dragRef.current = null
        e.currentTarget.releasePointerCapture(e.pointerId)

        const progress = Math.abs(rotateY.get() - d.startRot) / 180
        const moved    = Math.abs(e.clientX - d.startX) + Math.abs(e.clientY - d.startY)
        const v        = rotVelocity.get()
        const flick    = d.dir === 1 ? v < -200 : v > 200

        const complete = moved < 6 || progress > 0.35 || flick
        const endRot   = complete ? (d.dir === 1 ? -180 : 0) : d.startRot

        animate(rotateX, 0, { duration: 0.3 })
        animate(rotateY, endRot, {
            type: 'spring', stiffness: 220, damping: 30,
            onComplete: () => {
                if (complete) onCommit(currentIndex + d.dir)
                setFlipDir(null)
                rotateY.set(0)
                rotateX.set(0)
            },
        })
    }

    const startFlip = (dir: 1 | -1) => {
        if (flipDir) return
        const target = currentIndex + dir
        if (!Number.isFinite(target) || target < 0 || target > totalPages - 1) return

        setFlipDir(dir)
        rotateY.set(dir === 1 ? 0 : -180)

        animate(rotateY, dir === 1 ? -180 : 0, {
            duration: 0.6,
            ease: [0.25, 0, 0.85, 1],
            onComplete: () => {
                onCommit(currentIndex + dir)
                setFlipDir(null)
                rotateY.set(0)
            },
        })
    }

    const page = (items: Recipe[]) => (
        <div className={`w-full h-full p-6`}>
            <div className="grid grid-cols-2 grid-rows-2 gap-8 h-full bg-white/80 p-4">
                {
                    items.map((recipe: Recipe) => (
                        <RecipeCard
                            key={ recipe.recipeId }
                            recipeId={ recipe.recipeId }
                            recipeName={ recipe.name }
                            mainImageLink={ recipe.mainImage ?? undefined }
                            tags={ recipe.tags }
                            description={ recipe.description }
                            timeToPlate={ recipe.totalTime }
                        />
                    ))
                }
            </div>
        </div>
    )

    return (
        <div
            className="relative w-full h-full bg-brand rounded-lg"
            // style={{ perspective: 2000 }}
            // ref={containerRef}
        >
            {/* static left half */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-brand"
                // onClick={()=>startFlip(-1)}
                onPointerDown={onPointerDown(-1)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                { page(staticLeft) }
            </div>

            {/* static right half — revealed as the sheet lifts */}
            <div className="absolute inset-y-0 left-1/2 w-1/2 bg-brand"
                // onClick={()=>startFlip(1)}
                onPointerDown={onPointerDown(1)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                { page(staticRight) }
            </div>

            {/* spine */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-2 z-30 pointer-events-none" />

            {/* the flipping sheet */}
            {
                flipDir && (
                    <motion.div
                        className="absolute inset-y-0 left-1/2 w-1/2 z-20"
                        style={{
                                rotateY,
                                rotateX,
                                scaleX: gather,
                                skewY: bow,
                                transformOrigin: 'left center',
                                transformStyle: 'preserve-3d',
                                willChange: 'transform',
                            }}
                    >
                        {/* front face */}
                        <div className="absolute inset-0 bg-brand" style={{ backfaceVisibility: 'hidden' }}>
                            { page(sheetFront) }
                            <motion.div
                                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/55 via-black/20 to-transparent"
                                style={{ opacity: frontShade }}
                            />
                            <motion.div
                                className="absolute inset-0 pointer-events-none bg-gradient-to-l from-white/40 to-transparent"
                                style={{ opacity: sheen }}
                            />
                        </div>

                        {/* back face */}
                        <div
                            className="absolute inset-0 bg-brand"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            { page(sheetBack) }
                            <motion.div
                                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/55 via-black/20 to-transparent"
                                style={{ opacity: backShade }}
                            />
                            <motion.div
                                className="absolute inset-0 pointer-events-none bg-gradient-to-l from-white/40 to-transparent"
                                style={{ opacity: sheen }}
                            />
                        </div>
                    
                    </motion.div>
                )
            }
        </div>
    )
}

export default RecipeBookDisplay