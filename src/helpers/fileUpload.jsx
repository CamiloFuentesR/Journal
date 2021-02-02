

export const fileUpload = async (file) => {

        const cloudUrl = 'https://api.cloudinary.com/v1_1/mpersonale/upload';

        const formData = new FormData();

        formData.append('upload_preset','React-journal');
        formData.append('file',file);

        try {
            const resp = await fetch(cloudUrl,{
                method:'POST',
                body: formData
            });

            if(resp.ok){
                const clouResp = await resp.json();
                console.log(clouResp);
                return clouResp.secure_url;
            }else{
                throw await resp.json();
            }
        } catch (error) {
            throw error;
        }

    //return url de la img
}