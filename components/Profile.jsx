import Promptcard from "./Promptcard"


const Profile = ({name , desc , data , handleEdit , handleDelete}) => {
  return (
    <div className="w-full ">
      <h3 className="head_text text-center">
        <span className="orange_gradient">{name} profile</span>
      </h3>
      <p className="mt-6 font-medium text-gray-600 text-lg text-center">{desc}</p>

      <div className="mt-16 flex gap-3 w-full flex-col justify-center items-center lg:flex-row lg:items-start pb-6">
         {data.map((p) => (
          <Promptcard key={p._id} post = {p} handleEdit = {handleEdit}  handleDelete = {handleDelete}
          />
         ))}
      </div>
    </div>
  )
}

export default Profile
