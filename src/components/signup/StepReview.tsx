export default function StepReview({data,updateFielHandler}: { data: any; updateFielHandler: any}) {
    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8 text-white'>
                        Revise seus dados!
                        Email: {data.email}
                    </div>

                </div>
            </main>

        </div>
    )
}