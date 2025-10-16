import styled from '@emotion/styled'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

export const Title = styled.h2`
  margin: 0;
`

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
`

export const ProjectCard = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary.base},
      ${({ theme }) => theme.colors.secondary.base}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.base};
    box-shadow: 0 8px 24px rgba(196, 113, 245, 0.15);
    transform: translateY(-4px);

    &::before {
      transform: scaleX(1);
    }

    .arrow {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(-2px);
  }
`

export const ProjectIconWrapper = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
`

export const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`

export const ProjectName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.dark};
`

export const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
  word-break: keep-all;
`

export const ArrowIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.primary.base};
  flex-shrink: 0;
  transition: transform 0.3s ease;
`
