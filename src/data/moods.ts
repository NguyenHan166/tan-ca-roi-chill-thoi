import { Mood } from '../types';

export const moods: Mood[] = [
  {
    id: 'tired',
    name: 'Hôm nay hơi mệt',
    quote: 'Gác lại âu lo ngoài ô cửa. Một ly trà ấm, một bản nhạc êm, vậy là đủ cho buổi tối hôm nay rồi.',
    description: 'Dành cho những ngày năng lượng cạn kiệt, chỉ muốn tựa lưng nghỉ ngơi.',
    bgClass: 'bg-[#EDE7E1]',
    textColorClass: 'text-[#5A4B41]',
    icon: 'BatteryLow',
    recommendedAudioId: 'lofi'
  },
  {
    id: 'focus',
    name: 'Cần tập trung một chút',
    quote: 'Chỉ cần chiếc bàn gọn gàng hơn một chút, đầu óc cũng có thể nhẹ nhõm và sáng suốt hơn đôi phần.',
    description: 'Không gian yên tĩnh lý tưởng để hoàn thành nốt công việc còn dang dở.',
    bgClass: 'bg-[#E3E8E2]',
    textColorClass: 'text-[#485440]',
    icon: 'Sparkles',
    recommendedAudioId: 'cafe'
  },
  {
    id: 'rain',
    name: 'Muốn ngồi nghe mưa',
    quote: 'Ngoài trời có mưa hay không cũng được. Chúng mình cùng tạo một cơn mưa nhỏ rì rào ở đây nhé.',
    description: 'Âm thanh rào rạc ngoài ô cửa sổ luôn mang lại một cảm giác an yên đến lạ kỳ.',
    bgClass: 'bg-[#DFE5E8]',
    textColorClass: 'text-[#43535C]',
    icon: 'CloudRain',
    recommendedAudioId: 'rain'
  },
  {
    id: 'decor',
    name: 'Muốn decor lại góc nhỏ',
    quote: 'Đôi khi, chỉ một chiếc đèn đúng gam màu ấm cũng đủ khơi gợi cảm hứng ngồi lại bàn làm việc lâu hơn.',
    description: 'Chăm chút cho không gian riêng cũng là một cách vỗ về cảm xúc bản thân.',
    bgClass: 'bg-[#F2EADF]',
    textColorClass: 'text-[#6B533E]',
    icon: 'LayoutGrid',
    recommendedAudioId: 'lofi'
  },
  {
    id: 'lazy',
    name: 'Chẳng muốn làm gì cả',
    quote: 'Không phải hôm nào chúng mình cũng cần năng suất. Có những ngày, chỉ cần ngồi yên lặng đã là một điều tuyệt vời.',
    description: 'Cho phép bản thân lười biếng một chút. Ngày mai chúng mình lại tiếp tục cố gắng nhé.',
    bgClass: 'bg-[#F5EBE6]',
    textColorClass: 'text-[#6B4E42]',
    icon: 'Coffee',
    recommendedAudioId: 'nature'
  }
];
