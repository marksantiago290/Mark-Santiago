import { SocialPlatform } from "@lib/types"
import { AiOutlineInstagram } from "react-icons/ai"
import { BsFacebook, BsTwitter, BsTelegram, BsLinkedin } from "react-icons/bs"
import { HiMail } from "react-icons/hi"

const socialMedia: SocialPlatform[] = [
  {
    title: "Telegram",
    Icon: BsTelegram,
    url: "https://t.me/marksantiago2909",
  },
  {
    title: "Instagram",
    Icon: AiOutlineInstagram,
    url: "https://www.instagram.com/marksantiago2909/",
  },
  {
    title: "Facebook",
    Icon: BsFacebook,
    url: "https://www.facebook.com/profile.php?id=61569628505488&mibextid=ZbWKwL",
  },
  {
    title: "Twitter",
    Icon: BsTwitter,
    url: "https://www.x.com/marksantiago2909",
  },
  // {
  //   title: "YouTube",
  //   Icon: BsYoutube,
  //   url: "https://www.youtube.com/channel/UCNNlfUfTU61QaJDWPEakkeg",
  // },
  {
    title: "Linkedin",
    Icon: BsLinkedin,
    url: "https://www.linkedin.com/in/marksantiago2909/"
  },
  {
    title: "Mail",
    Icon: HiMail,
    url: "mailto:marksantiago2909@gmail.com",
  }
]

export default socialMedia
