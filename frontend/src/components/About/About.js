import { Container, Card, Col } from "react-bootstrap"
import "./About.scss"
import AuthorCard from "./AuthorCard"

export default function About() {
  const authors = [
    {
      nickname: "Object_417",
      avatar: "https://i.pinimg.com/originals/bb/18/8e/bb188e0bec649d84873aa871d2529436.jpg",
      occupation: "Front-End Developer",
      link: "https://github.com/Object417",
      description: [
        "Morbi sagittis sem eget lorem maximus accumsan. Fusce eget turpis et eros accumsan tincidunt vel sit amet lorem. Duis iaculis non ligula sit amet suscipit. Maecenas imperdiet quam in orci tincidunt pretium. Integer dictum varius velit, quis posuere elit hendrerit id. Nunc tempus aliquet interdum. Morbi turpis justo, posuere id velit et, pretium commodo quam. Nunc eget nibh tempus, eleifend metus in, fringilla neque. Nunc et aliquam ligula. Vestibulum a augue magna. Nulla facilisi. Vivamus posuere nunc ex, vel fermentum orci mattis in. Donec gravida sagittis faucibus. Donec luctus varius metus, sit amet condimentum sapien rhoncus sed. Vivamus ultrices nisl in urna porta consequat.",
        "Etiam risus sem, varius vitae nulla ac, pellentesque hendrerit est. Etiam a sem accumsan, luctus nunc vel, rhoncus nisi. Suspendisse luctus risus eget lacus condimentum luctus. Donec gravida malesuada nunc sit amet sagittis. Nam congue nunc velit. Donec nec lectus odio. Proin tempus eu velit vel sollicitudin. Pellentesque convallis ante nibh, dapibus maximus nibh sodales nec. Duis purus ante, mattis vel porttitor in, vehicula id tortor. Quisque vel arcu quam. Vivamus pretium mauris eu sodales tempus. Mauris justo risus, varius at eleifend quis, efficitur at nibh. Nunc dignissim dui eu metus fringilla dapibus. Sed fringilla, tortor ut bibendum cursus, enim tellus varius lacus, nec gravida ligula turpis sit amet diam. Nullam eros augue, tristique quis consequat at, bibendum at odio."
      ]
    },
    {
      nickname: "Jurb",
      avatar: "https://i.pinimg.com/550x/ed/cf/cc/edcfcceee274c98a860cfe2be92e047f.jpg",
      occupation: "Back-End Developer",
      link: "https://github.com/jurbx",
      description: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus magna et sem tincidunt, quis bibendum dui suscipit. In interdum vitae est vel scelerisque. Donec maximus, nunc at placerat egestas, sapien ante interdum orci, vel varius odio libero eget mi. Praesent sodales quis odio sed porta. Aliquam faucibus in lectus euismod auctor. Duis tempor nisi non ligula posuere viverra. Curabitur tincidunt elit quis purus maximus pharetra. In mattis euismod fermentum. Vestibulum vel ornare mi. Curabitur at tortor tempus, egestas enim a, condimentum dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "Fusce finibus viverra nibh malesuada rutrum. Duis vulputate pellentesque enim euismod tincidunt. Fusce vel finibus magna, ut tempor dolor. Etiam imperdiet nisi tellus, eu rutrum sem maximus sed. Maecenas blandit, erat eu consequat tempus, orci lorem viverra ex, eget pellentesque dui orci eu nunc. Vivamus fermentum porttitor augue, non consectetur sem tincidunt non. Fusce quis ultricies sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor augue ex, sit amet sodales eros volutpat eget."
      ]
    }
  ]

  return (
    <main className="text-white py-4">
      <Container className="py-4 bg-dark rounded">
        <h2 className="section-title">The Team</h2>
        {authors.map((author, idx) => <AuthorCard key={"authorCard" + idx} author={author} />)}
      </Container>
    </main>
  )
}
