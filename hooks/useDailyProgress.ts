import { getBrowserSupabase } from "@/lib/supabase/client";


export type DailyProgressType = 
| 'opening_ok'
| 'ending_ok'
| 'description_ok'
| 'image_ok'
| 'animedle_ok'
| 'all_ok'
export const useDailyProgress = () => {
  const supabase = getBrowserSupabase();
   
  const updateStat = async (type_stat : DailyProgressType, isCorrect : boolean, nextStage: number) => {
     const user = await supabase.auth.getUser()
     const userid = user?.data?.user?.id

     if(!userid){
        return { error: 'Usuario no encontrado' }
     }
     const {error: ErrorUpdate} = await supabase.rpc('increment_daily_stat', {
        p_user_id: userid,
        p_column_name: type_stat,
        p_increment_value: isCorrect ? 1 : 0,
        p_next_stage: nextStage,
     })

     if(ErrorUpdate){
        return { error: ErrorUpdate.message }
     }
     return { success: true }
  }
  return { updateStat }
}