import { useCookies } from "react-cookie"
import { useState, useEffect } from "react"
import { Profile } from "@/features/mypage"

export interface UserProfileCookie extends Profile {
  interests: string[]
}

export const useUserProfile = (): UserProfileCookie | null => {
  const [cookies] = useCookies(["userProfile"])
  const [userProfile, setUserProfile] = useState<UserProfileCookie | null>(null)

  useEffect(() => {
    if (cookies.userProfile) {
      try {
        const parsedProfile = typeof cookies.userProfile === "string" ? JSON.parse(cookies.userProfile) : cookies.userProfile
        setUserProfile(parsedProfile)
      } catch (error) {
        console.error("userProfile 쿠키 파싱 실패:", error)
      }
    }
  }, [cookies])

  useEffect(() => {
    // console.log("userProfile: ", userProfile)
  }, [userProfile])

  return userProfile
}
