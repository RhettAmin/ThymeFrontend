import { View, Text, Pressable, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { isMobileSize } from '@/utils/windowSize';
import { Image } from 'expo-image';
import { useState } from 'react';
import { createPortal } from 'react-dom'

const headerInfo = [
    {
        name: "HOME",
        path: "/home",
        styling: "text-5xl text-primary font-bold"
    },
    {
        name: "RECIPES",
        path: "/recipes",
        styling: "text-sm text-primary font-bold"
    },
    {
        name: "ABOUT",
        path: "/about",
        styling: "text-sm text-primary font-bold"
    }
]

function BigHeader() {
    const recipes = headerInfo.find((element) => element.name === 'RECIPES')
    const home = headerInfo.find((element) => element.name == "HOME")
    const about = headerInfo.find((element) => element.name == "ABOUT")


    return <View className="py-5 items-center flex-row justify-center space-x-10">

        <View className='pt-7'>
            <Link href={ recipes!.path } className={ recipes!.styling }> 
                <Text> { recipes!.name } </Text>
            </Link>
        </View>

        <View className=''>
            <Link href={ home!.path } className={ home!.styling }> 
                <Text> THYME TO DINE </Text>
            </Link>
        </View>

        <View className='pt-7'>
            <Link href={ about!.path } className={ about!.styling }> 
                <Text> { about!.name } </Text>
            </Link>
        </View> 

    </View>
}

function MobileHeader() {

    const [displaySideDrawer, shouldDisplaySideDrawer] = useState<boolean>(false)

    function changeSideDrawerVisibility() {
        shouldDisplaySideDrawer(!displaySideDrawer)
        console.log(displaySideDrawer)
    }

    return <View className="py-5 items-center flex-row justify-center space-x-10">
        {
            createPortal(<View role="navigation" aria-hidden={ displaySideDrawer ? false : true }
                className={`absolute top-0 left-0 z-10 bg-footer h-[100vh] px-[14px] transition-transform
                    ease-in-out duration-5000 ${ displaySideDrawer ? "translate-x-0" : "-translate-x-[200px]" } `}>
                
                    <View className="flex-row pt-2 -mr-2 justify-end">
                        <Pressable className="text-primary" onPress={e => changeSideDrawerVisibility()}>
                            <Image
                                source={ require('@/assets/close.webp') } 
                                style={{ width: 15, height: 15 }}
                            />
                        </Pressable>
                    </View>
                    <View>
                        <Text className="px-1 pt-4 text-primary font-bold text-lg">THYME TO DINE</Text>
                    </View>
                    <View>
                        <FlatList
                            data={ headerInfo }
                            className="pl-1 pt-2"
                            renderItem={ ({item}) => {
                                return (
                                    <Link className="py-2" href={ item.path }> 
                                        <Pressable className="" onPress={e => changeSideDrawerVisibility()}>
                                            <Text className="text-primary font-semibold"> { item.name } </Text>
                                        </Pressable>
                                    </Link>
                                )}
                            }
                        />  
                    </View>
                </View>
            , document.getElementById("root")!!)
        }   

            <View className="flex-row space-x-10">
                <Pressable className={displaySideDrawer ? '-ml-[88px]' : '-ml-[88px]'} onPress={e => changeSideDrawerVisibility()}>
                    <Image
                        source={ require('@/assets/hamburger.png') } 
                        style={{ width: 20, height: 20}}
                    />
                </Pressable>
                <Link href="/home" className='text-3xl text-primary font-bold -my-[10px]'> 
                    <Text> THYME TO DINE </Text> 
                </Link>
            </View>

        </View>
}

export default function Header() {

    return (
        <View>
        {
            isMobileSize() ?
                <MobileHeader /> :
                <BigHeader/>
        }
        </View>
    );
}

