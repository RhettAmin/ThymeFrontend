import { Dimensions } from "react-native"

type Window = {
    width: number,
    height: number
}

function getDimensions(): any {
    return Dimensions.get('window')
}

export function getHeroWindowSize(): Window {
    const dimension = getDimensions()
    const window: Window = { width: 640, height: 320}
    if (dimension.width <= 640) {
        window.width = 360
        window.height = 180
    } else if(dimension.width > 640 && dimension.width <= 1024 ) {
        window.width = 576
        window.height = 288
    }
    return window
}

export function getPrevEatenWindowSize(): Window {
    const dimension = getDimensions()
    const window: Window = { width: 300, height: 300 }
    if (dimension.width <= 640) {
        window.width = 225
        window.height = 225
    } else if(dimension.width > 640 && dimension.width <= 1024 ) {
        window.width = 270
        window.height = 270
    } 
    return window
}

export function getRecipesWindowSize(): Window {
    const dimension = getDimensions()
    const window: Window = { width: 250, height: 250 }
    if (dimension.width <= 640) {
        window.width = 175
        window.height = 175
    } else if(dimension.width > 640 && dimension.width <= 1024 ) {
        window.width = 200
        window.height = 200
    } 
    return window
}

export function getAboutWindowSize(): Window {
    const dimension = getDimensions()
    const window: Window = { width: 250, height: 250 }
    if (dimension.width <= 640) {
        window.width = 150
        window.height = 150
    } else if(dimension.width > 640 && dimension.width <= 1024 ) {
        window.width = 200
        window.height = 200
    } 
    return window
}

export function isMobileSize(): boolean {
    return getDimensions().width <= 640 ? true : false
}
