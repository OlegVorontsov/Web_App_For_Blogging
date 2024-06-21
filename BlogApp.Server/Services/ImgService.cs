using Newtonsoft.Json;

namespace BlogApp.Server.Services
{
    public class ImgService
    {
        public static byte[] GetPhoto(string photo)
        {
            try
            {
                return JsonConvert.DeserializeObject<byte[]>(photo);
            }
            catch
            {
                try
                {
                    return JsonConvert.DeserializeObject<byte[]>("[" + photo + "]");
                }
                catch
                {
                    return Array.Empty<byte>();
                }
            }
        }
    }
}
